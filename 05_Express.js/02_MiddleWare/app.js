const http = require("http");
// It's common convention to space out the core 
// modules from the third party ones,
// as well as our own imports if there, but it's 
// ultimately up to you
const expressJS = require('express')

// Go ahead and press 'ctrl' then click 
// 'express' in the require function above, 
// you'll be taken to an index.d.ts file for 
// the source code for that, and in that file ut 
// exports: export = e;

// So it exports a function

// Now that we have express, we can 
// create an express app and save it in 
// a constant: 

const app = expressJS()

// So a ton of logic is now in inside 
// the above app constant 


// app is now a valid request handler, so we 
// can pass app into our old server variable: 
// const server = http.createServer()
const server = http.createServer(app)

server.listen(3000)