const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
// now we use bodyParser.json, since we're working 
// with JSON, we expect JSON, earlier in the course 
// we used bodyParser.urlencoded, not anymore 

app.use((req, res, next) => {
    // These headers are set to allow CORS to be used, the 
    // '*' is a wildcard, meaning anything is allowed, or 
    // we can pass in specified values, for the first we couldv've 
    // passed in : 
    
    // res.setHeader('Access-Control-Allow-Origin', 'codepen.io');

    // if we wanted to to only allow codepen.io, or lock 
    // it to any specific domain

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization' );
    next()
})


app.use('/feed', feedRoutes);
// so any request that starts with /feed will be 
// forwarded to the feedRoutes, into routes/feed.js
// where we handle one request for now '/posts' 

app.listen(8080);