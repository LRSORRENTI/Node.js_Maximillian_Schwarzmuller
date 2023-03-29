const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers)
    res.setHeader('Content-Type', 'text/html')
    // so the above will set a new header, 
    // and Content-Type is a default header 
    // which the browser knows and accepts, 

    // and as a second arg. we pass in text/html
    // and it will attach a header to the response, 
    // where we pass info, and the type of data 
    // will be html, but right now, we don't have 
    // any html to send so let's add some: 
 
// res.write() will be how we add HTML, though later 
// on we'll learn a much easier way to do this 

    res.write('<html>')
    res.write('<head><title>My First Page With Node</title></head>')
    res.write('<body><h1>Hello World From Node.js Server</h1></body>')
    res.write('</html>')
    // So now that we've added a very basic 
    // html to return, we need to call res.end()
    res.end()
    // At this point below res.end() we musn't put 
    // any more code, res.end() ends everything, the 
    // response is now sent back to the client
})

server.listen(3000)