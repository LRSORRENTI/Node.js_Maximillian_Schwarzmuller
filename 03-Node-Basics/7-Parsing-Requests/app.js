const http = require('http');
const fs = require('fs');

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
        // when recieving a posted message, before 
        // sending the response and before writing 
        // the message file we need to get the 
        // request data, we do this with 
        // dot notation req.on()
        const body = [];
        req.on('data', (chunk) =>{
              console.log(chunk)
              //  now we save an empty array to a var 
              // called body, this will house 
              body.push(chunk)
        } )
        // .on() allows us to listen to events, and 
        // the event we want to listen to above is 
        // the data event, and the data event will fire 
        // every time a new chunk on the stream is ready
        // to be read by the buffer, but we also need 
        // a second argument which will be a callback function 
        // which will execute for each data event 

         // Now we need to register another event 
         // listener, the end listener: 
         req.on('end', () => {
              // inside here is where we buffer the chunks 
              // by creating a new variable where we call the 
              // Buffer globally available object
              // and acceess concat() with dot, and we 
              // concat the body using that dot
              // notation, it will take all the chunks and add 
              // them together, then postfixed to the (body) we 
              // passed in, we use .toString(), important 
              // to note this works because we know the incoming 
              // data will be text data , if it were a file or 
              // something else we'd need to utilize different methods 

              const parsedBody = Buffer.concat(body).toString();
               console.log(parsedBody)
               const parseMessage = parsedBody.split('=')[1]
                  // above we are splitting the value of parsedBody 
                  // at the equal sign since the value saved to 
                  // parsedBody at this point is: message=hello
                  // and we want the index of 1 from that, which is 
                  // hello, index[0] would be message
                  fs.writeFileSync('message.txt', parseMessage );
         });
         // the above will fire when it's done parsing 
         // the incoming request data

         // So after entering data in the text field 
         // and pressing send, we see two things logged 
         // to the console. the first is from our 
         // console.log(chunk)
         // and the output of that is: 
         // <Buffer 6d 65 73 73 61 67 65 3d 68 65 6c 6c 6f>
         
         // So the above buffer isn't something  we can work 
         // with but the parsedBody below is

         // the second console.log(parsedBody)
         // message=hello
         // So the above is a key value pair, like in 
         // and object, but instead of a colon :, it's 
         // an equal sign

         // key=value

        // fs.writeFileSync('message.txt', 'change me later' );
        // now we also need to move the above code into the 
        // req.on() end function, the reason being if we 
        // leave it outside of req.on() it will run before 
        // that function is called 
        res.statusCode = 302;
          res.setHeader('Location', '/')
          return res.end()
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page With Node</title></head>')
    res.write('<body><h1>Hello World From Node.js Server</h1></body>')
    res.write('</html>')
    res.end();
})

server.listen(3000)

// Important to note the above code is the RAW logic, 
// it may seem complex, but later we'll see how 
// Express.js can help us with this kind of stuff, 
// it's very important to understand how this 
// works at this level before jumping into Express.js