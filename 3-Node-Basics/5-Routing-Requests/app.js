// In the last lecture we learned how to spin 
// up that server, and the request object with 
// data about the incoming request, and the 
// response object

// Let's now connect request and response 

const http = require('http');

const server = http.createServer((req, res) => {
    // instead of logging request data like in 
    // the last lecture, let's create a server 
    // that will have different behaviours based 
    // on the route we enter

    // Let's have the user enter data on localhost3000 
    // or whatever page, which we'll then take that 
    // data and store it in a file on the server once 
    // it's sent

    // To do this we first parse the url by saving 
    // req.url to a variable

    // GPT ASSIST: 
    // The req and res arguments
    //  in the anonymous function 
    //  represent the incoming request 
    //  and the outgoing response 
    //  respectively. The req object
    //   contains information about 
    //   the request made to the server, 
    //   such as the HTTP method used, 
    //   the URL of the request, 
    //   and any request headers.
    //    The res object, on
    //     the other hand, is 
    //     used to send the response 
    //     back to the client, and it 
    //     contains methods such as res.write() 
    //     and res.end() to write data to the
    //      response and end the response 
    //      respectively.





    const url = req.url;

    // then we add a conditional check to see if 
    // url === '/'
      if(url === '/'){
        // if true, return some html which gives the 
        // user an input field and a button to submit a 
        // new request in return, which will NOT be a 
        // get request
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        // there are different kinds of http methods to use but 
        // GET and POST are very commonly used, and a GET request
        // is automatically sent when you click a link or enter 
        // a url, a POST request must be set up by us, by 
        // creating a form similar to the one above, so the 
        // above will send a POST request to /message. it will 
        // also check the content of the form, detect any inputs 
// So now if we visit localhost:3000/    <--- nothing postfixed to / 
// we return a response where we render the HTML above
        res.write('</html>')
        // And let's add a return statement before res.end();
        // This is not required to return a response, but 
        // to return from the anonymous function
       return res.end();
      }
      res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page With Node</title></head>')
    res.write('<body><h1>Hello World From Node.js Server</h1></body>')
    res.write('</html>')
    res.end();
})

server.listen(3000)

// And yes, on localhost:3000/ we see the empty input 
// field with the send button, after entering text 
// with some text, we end up at localhost:3000/message
// and once there we see the rendered H! tag saying 
// Hello World From Node.js Server, that is a routed 
// request