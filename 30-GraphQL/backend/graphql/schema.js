// Inside here we'll define our graphql schema, 
// we first import the package from graphql:
const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type RootQuery{
        hello: String
    }    

schema {
        query: RootQuery
    }
`)

// The above is a very basic query where we send 
// a 'hello' query and expect to get back a string or 
// some text  