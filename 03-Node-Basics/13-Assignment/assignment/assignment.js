const http = require('http')


const server = http.createServer((req, res) => {
    console.log(req)
    const url = req.url; 
    const method = req.method;
    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>Hello World</title></head>')
        res.write('<h3>Hello world from node</h3>')
        res.write('<body><form action="/users" method="POST"><input type="text" name="users"><button type="submit">Send</button></form></body>');
        res.write('</html>')
        return res.end();
    }
    if(url === '/users'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Hello World</title></head>')
        res.write('<ul><li>User 1</li>')
        res.write('<li>User 2</li>')
        res.write('<li>User 3</li></ul>')
        res.write('</html>')
    }
})

server.listen(3000)