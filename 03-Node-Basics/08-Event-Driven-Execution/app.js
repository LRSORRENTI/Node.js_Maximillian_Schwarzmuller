const http = require('http');
const fs = require('fs');


// The order of code execution is not 
// always the order in which it's written
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
    res.write('<html>')
    res.write('<head><title>Enter Message</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>')
    return res.end();

    }
    if(url === '/message' && method === 'POST'){

        const body = [];
        req.on('data', (chunk) =>{
              console.log(chunk)
           
              body.push(chunk)
        } )
     
         req.on('end', () => {
           // The below code will run AFTER the 
           // res.setHeader code below, that's because 
           // we are specifying 'end', otherwise node 
           // would need to pause entirely until 
           // it's finished, this way node can execute the 
           // code below, then execute this code 
              const parsedBody = Buffer.concat(body).toString();
               console.log(parsedBody)
               const parseMessage = parsedBody.split('=')[1]
                 // the below fs.writeFileSync will actually execute AFTER 
                 // the res.statusCode, and res.SetHeader 
                 // code below, this has important 
                 // implications, for one, sending the 
                 // response doesn't mean the event listeners 
                 // are finished, they will still 
                 // execute even if the response is already 
                 // gone, it also means that  if we do 
                 // something in the event listener that should 
                 // influence the response, the structure as 
                 // we have it now is the wrong way to set it up
                 // we should add the code from below: 
                //  res.statusCode = 302;
                //  res.setHeader('Location', '/')
                //  return res.end()
                // under our fs.writeFileSync
           
                  fs.writeFileSync('message.txt', parseMessage );
                 // Now we maved the response code inside 
                 // the event listener in case we now have 
                 // code that needs to influence the response 
                  res.statusCode = 302;
                  res.setHeader('Location', '/')
                  return res.end()
                  // Make note that when we use things like 
                  // req.on and createServer() these 
                  // are examples where node.js uses a pattern 
                  // where we pass a function to a function, 
                  // and node will execute the passed in funcs 
                  // at a later point in time, or ASYNCHRONOUSLY
                  // it's not always the case, but node does use this 
                  // pattern heavily

                  // So when node comes across the req.on('end' )
                  // it registers that internally, and when the 
                  // end comes, it then executes that function

                  // The takeaway is the node has an internal 
                  // registry of events, and listeners to those 
                  // events 
         });
        
     
        // res.statusCode = 302;
        //   res.setHeader('Location', '/')
        //   return res.end()
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page With Node</title></head>')
    res.write('<body><h1>Hello World From Node.js Server</h1></body>')
    res.write('</html>')
    res.end();
})

server.listen(3000)

