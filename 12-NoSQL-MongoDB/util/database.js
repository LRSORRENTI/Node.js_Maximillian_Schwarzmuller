// Inside here we'll setup the code to connect to our 
// SQL database and return a connection object, 
// which enables us to execute queries

// const mysql = require('mysql2')
// const config = require('./config')
// First we need to save the package we installed 
// to a variable above 

// The approach we're going to take is to 
// execute this code, for every query, 
// constantly stopping and restarting connections 
// becomes cumbersome 

/// Which is why we're going to create a: 
// 'CONNECTION POOL' 

// What is this? Well we'll create it!

// const pool = mysql.createPool(config.db)
    // We first need to pass in an object
    // with some pairs: 
// Going to reference a config file instead

// with this createPool method, we can 
// always reach out and make connections without 
// the need to constantly start and stop the connection 
// when we need to run a query

// The pool will manage the connections, so we 
// can run multiple queries simultaneously, each 
// query requires it's own connection

// The pool can then finish when the application 
// shuts down 

// We'll utilize the promise method so we can 
// work with promises, which in our case  is 
// much better than callbacks 

// Async code is better with promises because it 
// enables a more structured completion, there 
// aren't nested callbacks, instead we use 
// promise method chaining

const login = require('dotenv').config({path:'C:/Users/lrsor/Desktop/Programming/MAX-NODE/NODE-JS_MAX/12-NoSQL-MongoDB/util/my.env'});
console.log(login, 'success?')
// OKAY AS A NOTE HERE, THE CONFIG PATH IS WORKING WITH 
// THE ACTUAL PATH WHEN  path: '/my.env' or path:'./my.env' no 
// success 

require('dotenv').config({ path: '/my.env' });


const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
// Using .env file to not expose login credentials, 
// although since this is just a dummy course and 
// the login for mongodb is unique, it probably doesn't 
// matter

/// now that we've brought in mongoDb and 
// saved mongoclient, we can use the client to 
// connect to our database 

const mongoConnect = (callback) => {
// MongoClient.connect(`mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/?retryWrites=true&w=majority`)
MongoClient.connect(`mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/?retryWrites=true&w=majority`)
.then(client => { 
console.log('Successful Connection');
callback(client);
})
.catch(err => {console.log(err)});
// the connect method also returns a promise, which 
// we want to log, if we do get an error somewhere 
};

module.exports = mongoConnect;