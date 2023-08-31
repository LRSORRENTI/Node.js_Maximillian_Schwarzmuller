// Inside here we'll define our graphql schema, 
// we first import the package from graphql:
const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type RootQuery{
        hello: String!
    }    

schema {
        query: RootQuery
    }
`)

// The above is a very basic query where we send 
// a 'hello' query and expect to get back a string or 
// some text, and that text is now defined in our 
// resolvers.js file, it needs to be resolved!

// We can also make the value for the return 
// by appending a '!', this means it's required to 
// be a string 