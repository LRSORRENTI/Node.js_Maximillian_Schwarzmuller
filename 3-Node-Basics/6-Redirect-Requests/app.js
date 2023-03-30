const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>')
        return res.end();
        // So as we see, when we click submit button, 
        // we send a POST request to /message, but 
        // we're not actually doing anything with it
        // let's change that 
    }
    // let's add another if check to see if the 
    // url === /message, and check to make sure we're 
    // not handling a GET request, but a POST request
    
    // so now we only enter this below if check if we have 
    // a post request to /message, which happens 
    // to be exactly what we created in the above form

    if(url === '/message' && method === 'POST'){
      // inside here we want to redirect the user, 
      // back to '/', so take them away from /message
      // and then create a new file to store the 
      // message the user entered in it, we start 
      // with redirecting and creating that file 
      // We actually did something similar in the 
      // beginning of the course with writeFileSync
      // so let's import file system with const fs = 
      // require fs above under const http
      fs.writeFileSync('message.txt', 'change me later' );
      // so above we write the message data to a file 
      // called message.txt
          res.statusCode = 302;
          res.setHeader('Location', '/')
          // above allows us to write meta information
          // and for the first arg we use status code 
          // 302 which stands for redirection, and for 
          // the second arg we pass a JS object, with some 
          // headers
          
          // And yes after entering a text message and 
          // pressing the send button we're redirected 
          // to the same page but with a clear input 
          // text field next to the send button, and 
          // we have a message in the network tab with 
          // a status code of 302, and a message.txt file 
          // saved to our directory with the text from 
          // the submitted input field 
          return res.end()
          // So next we'll learn of to parse the data 
          // the user submits and writing that data into 
          // that file 
    }
    res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>My First Page With Node</title></head>')
  res.write('<body><h1>Hello World From Node.js Server</h1></body>')
  res.write('</html>')
  res.end();
})

server.listen(3000)