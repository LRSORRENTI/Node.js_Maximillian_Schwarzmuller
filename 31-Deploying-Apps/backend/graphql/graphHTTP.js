

module.exports = function graphqlHTTP(options) {
    if (!options) {
      throw new Error('GraphQL middleware requires options.');
    }
  
    return function graphqlMiddleware(request, response) {
      // Higher scoped variables are referred to at various stages in the
      // asynchronous state machine below.
      var params = void 0;
      var pretty = void 0;
      var formatErrorFn = void 0;
      var extensionsFn = void 0;
      var showGraphiQL = void 0;
      var query = void 0;
  
      var documentAST = void 0;
      var variables = void 0;
      var operationName = void 0;
  
      // Promises are used as a mechanism for capturing any thrown errors during
      // the asynchronous process below.
  
      // Parse the Request to get GraphQL request parameters.
      return getGraphQLParams(request).then(function (graphQLParams) {
        params = graphQLParams;
        // Then, resolve the Options to get OptionsData.
        return typeof options === 'function' ? options(request, response, params) : options;
      }).then(function (optionsData) {
        // Assert that optionsData is in fact an Object.
        if (!optionsData || (typeof optionsData === 'undefined' ? 'undefined' : _typeof(optionsData)) !== 'object') {
          throw new Error('GraphQL middleware option function must return an options object ' + 'or a promise which will be resolved to an options object.');
        }
  
        // Assert that schema is required.
        if (!optionsData.schema) {
          throw new Error('GraphQL middleware options must contain a schema.');
        }
  
        // Collect information from the options data object.
        var schema = optionsData.schema;
        var context = optionsData.context || request;
        var rootValue = optionsData.rootValue;
        var graphiql = optionsData.graphiql;
        pretty = optionsData.pretty;
        formatErrorFn = optionsData.formatError;
        extensionsFn = optionsData.extensions;
  
        var validationRules = _graphql.specifiedRules;
        if (optionsData.validationRules) {
          validationRules = validationRules.concat(optionsData.validationRules);
        }
  
        // GraphQL HTTP only supports GET and POST methods.
        if (request.method !== 'GET' && request.method !== 'POST') {
          response.setHeader('Allow', 'GET, POST');
          throw (0, _httpErrors2.default)(405, 'GraphQL only supports GET and POST requests.');
        }
  
        // Get GraphQL params from the request and POST body data.
        query = params.query;
        variables = params.variables;
        operationName = params.operationName;
        showGraphiQL = graphiql && canDisplayGraphiQL(request, params);
  
        // If there is no query, but GraphiQL will be displayed, do not produce
        // a result, otherwise return a 400: Bad Request.
        if (!query) {
          if (showGraphiQL) {
            return null;
          }
          throw (0, _httpErrors2.default)(400, 'Must provide query string.');
        }
  
        // GraphQL source.
        var source = new _graphql.Source(query, 'GraphQL request');
  
        // Parse source to AST, reporting any syntax error.
        try {
          documentAST = (0, _graphql.parse)(source);
        } catch (syntaxError) {
          // Return 400: Bad Request if any syntax errors errors exist.
          response.statusCode = 400;
          return { errors: [syntaxError] };
        }
  
        // Validate AST, reporting any errors.
        var validationErrors = (0, _graphql.validate)(schema, documentAST, validationRules);
        if (validationErrors.length > 0) {
          // Return 400: Bad Request if any validation errors exist.
          response.statusCode = 400;
          return { errors: validationErrors };
        }
  
        // Only query operations are allowed on GET requests.
        if (request.method === 'GET') {
          // Determine if this GET request will perform a non-query.
          var operationAST = (0, _graphql.getOperationAST)(documentAST, operationName);
          if (operationAST && operationAST.operation !== 'query') {
            // If GraphiQL can be shown, do not perform this query, but
            // provide it to GraphiQL so that the requester may perform it
            // themselves if desired.
            if (showGraphiQL) {
              return null;
            }
  
            // Otherwise, report a 405: Method Not Allowed error.
            response.setHeader('Allow', 'POST');
            throw (0, _httpErrors2.default)(405, 'Can only perform a ' + operationAST.operation + ' operation ' + 'from a POST request.');
          }
        }
        // Perform the execution, reporting any errors creating the context.
        try {
          return (0, _graphql.execute)(schema, documentAST, rootValue, context, variables, operationName);
        } catch (contextError) {
          // Return 400: Bad Request if any execution context errors exist.
          response.statusCode = 400;
          return { errors: [contextError] };
        }
      }).then(function (result) {
        // Collect and apply any metadata extensions if a function was provided.
        // http://facebook.github.io/graphql/#sec-Response-Format
        if (result && extensionsFn) {
          return Promise.resolve(extensionsFn({
            document: documentAST,
            variables: variables,
            operationName: operationName,
            result: result
          })).then(function (extensions) {
            if (extensions && (typeof extensions === 'undefined' ? 'undefined' : _typeof(extensions)) === 'object') {
              result.extensions = extensions;
            }
            return result;
          });
        }
        return result;
      }).catch(function (error) {
        // If an error was caught, report the httpError status, or 500.
        response.statusCode = error.status || 500;
        return { errors: [error] };
      }).then(function (result) {
        // If no data was included in the result, that indicates a runtime query
        // error, indicate as such with a generic status code.
        // Note: Information about the error itself will still be contained in
        // the resulting JSON payload.
        // http://facebook.github.io/graphql/#sec-Data
        if (response.statusCode === 200 && result && !result.data) {
          response.statusCode = 500;
        }
        // Format any encountered errors.
        if (result && result.errors) {
          result.errors = result.errors.map(formatErrorFn || _graphql.formatError);
        }
  
        // If allowed to show GraphiQL, present it instead of JSON.
        if (showGraphiQL) {
          var payload = (0, _renderGraphiQL.renderGraphiQL)({
            query: query,
            variables: variables,
            operationName: operationName,
            result: result
          });
          return sendResponse(response, 'text/html', payload);
        }
  
        // At this point, result is guaranteed to exist, as the only scenario
        // where it will not is when showGraphiQL is true.
        if (!result) {
          throw (0, _httpErrors2.default)(500, 'Internal Error');
        }
  
        // If "pretty" JSON isn't requested, and the server provides a
        // response.json method (express), use that directly.
        // Otherwise use the simplified sendResponse method.
        if (!pretty && typeof response.json === 'function') {
          response.json(result);
        } else {
          var _payload = JSON.stringify(result, null, pretty ? 2 : 0);
          sendResponse(response, 'application/json', _payload);
        }
      });
    };
  }
