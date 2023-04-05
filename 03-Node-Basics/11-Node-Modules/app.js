const http = require('http');
// we don't need the file system in app js 
// anymore so we can comment it out

// const fs = require('fs');

// Inside of routes.js we added at the bottom of 
// the page: 

// module.exports = requestHandler, 
// this means we can now import that function 
// into this file

const routes = require('./routes')

// after adding the above code, node will now 
// look for a file named routes in the same directory 
// as app.js, and it will find the routes.js 
// file with module.exports = requestHandler 


// now that we imported routes above, we can 
// pass that in as a handler below: 
// const server = http.createServer((req, res) => {

//     const server = http.createServer((req, res) => {

//     // We also can get rid of url and method 
//     // const url = req.url;
//     // const method = req.method;
  
// });

const server = http.createServer(routes);

server.listen(3000)

// And yes everything still works, our logic code is 
// just moved out of app.js into routes.js
// everything still works, after entering text 
// into the input field, it still writes a 
// message.txt file just like before 