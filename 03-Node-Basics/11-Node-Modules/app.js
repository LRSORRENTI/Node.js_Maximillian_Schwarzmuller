const http = require('http');
// we don't need the file system in app js 
// anymore so we can comment it out

// const fs = require('fs');

const server = http.createServer((req, res) => {
    // We also can get rid of url and method 
    // const url = req.url;
    // const method = req.method;
  
});

server.listen(3000)

