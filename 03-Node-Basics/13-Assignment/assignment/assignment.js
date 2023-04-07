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
        res.write('<form action="/create-user" method="POST"><input type="text" name="create-user"><button type="submit">Create user</button></form>')
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
    if(url === '/create-user'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>check console for parsed name?</title></head>')
        res.write('<h3>Check console for parsed name</h3>')
        res.write('<body><form action="/users" method="POST"><input type="text" name="users"><button type="submit">Send</button></form></body>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="create-user"><button type="submit">Create user</button></form>')
        res.write('</html>')
    }

    if(url === '/create-user' && method === 'POST'){

        const body = [];
        req.on('data', (chunk) =>{
              console.log(chunk)
              body.push(chunk)
        } )
         req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
               console.log(parsedBody)
               const parseMessage = parsedBody.split('=')[1]
                console.log(parsedBody)
                console.log(parseMessage)
         });
    
        // res.statusCode = 302;
        //   res.setHeader('Location', '/')
          return res.end()
    }
})

server.listen(3000)