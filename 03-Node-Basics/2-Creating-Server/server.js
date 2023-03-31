const http = require('http'); 

// So it's important to note, 
// when importing http, we do not 
// prepend any / or ./ since we need 
// the module, not a file called http, 
// then we can access through dot notation 
// the methods on the http module 

// and if we use the createServer() method, 
// we see it takes a request listener as 
// an argument, and a request listener 
// is a function that executes for every 
// incoming request

// And if we hover over each, we see types, 
 // Looks very similar to TS syntax

// function rqListener(request, response) {

// }

// http.createServer(rqListener);

// Above we omit the () b/c this tells createServer 
// to execute the function for every incoming request

// Keep in mind we don't need to explicitly create 
// such a function like rqListener(), we can 
// also use an anonymous function

//http.createServer(function(req, res){
    // this is a func w/o a name, hence anonymous
    // but we pass in the same values for args, 
    // request and response, it's the same functionality 
    // as the code we wrote above, just using 
    // anon func instead, this is known as 
    // event driven architecture, which node.js 
    // uses heavily, if x occurs, do y, in our 
    // case it's: if response occurs, execute 
    // func
//})


// We can also re-write the above with arrow func 
// syntax

//http.createServer((req, res) => {
    // This is our create server callback function, 
    // node.js calls it every time a request enters 
    // our server 
   // console.log(req)
//}) 

// if we execute the file with node right now, 
// nothing happens, that's because the method 
// above returns a server. That means we need 
// to store that in a variable, then console.log(var)

const server = http.createServer((req, res) => {
    console.log(req)
})

// Now we can use dot notation to access methods 
// on our server, and if we execute server.listen()
// node will keep the server running to listen 
// for incoming requests, and if we hover over 
// the listen method, we see it requires some 
// arguments, first is the port, if we omit the 
// args it will fill some default ones in automatically 
// but let's pass in port 3000 for this demo

server.listen(3000);

// Now if we run 'node server.js' in the terminal, 
// we see that the cursor is stuck, that's because 
// the server is running, it's listening for 
// requests 

// And if we go to localhost:3000 in the browser, 
// we don't see anything on the page since we 
// didn't configure it to return any HTML, but if 
// we look in the terminal we see a huge request logged 
// which is what we used in the const server = 
// we added console.log(req)

// We'll go over what's inside this in more detail, 
// but for now just know we now have a basic functional 
// web server 

// This is how to create servers in node.js

// So now we need to learn how to do 
// something meaningful with the request 
// and sending back a response
// WE need to import the http module