const http = require("http");
// It's common convention to space out the core 
// modules from the third party ones,
// as well as our own imports if there, but it's 
// ultimately up to you
const expressJS = require('express')

// Go ahead and press 'ctrl' then click 
// 'express' in the require function above, 
// you'll be taken to an index.d.ts file for 
// the source code for that, and in that file ut 
// exports: export = e;

// So it exports a function

// Now that we have express, we can 
// create an express app and save it in 
// a constant: 

const app = expressJS()

// So a ton of logic is now in inside 
// the above app constant 

// Now we can call app.use() which allows us 
// to use a new middleware function, and use 
// accepts an array of request handlers 

// But and easy way to use app.use() is to 
// pass a function to it
// app.use(() => {})
// now this function '() => {}' we're passing 
// as an argument, will be executed for every single 
// incoming request, and this function will use 
// three arguments, req, res, next

// We can rename these args whatever we want, 
// but what's their purpose? 

// Well we know request and response, but what 
// is next? 

// next is a function that allows our req argument 
// to travel onwards to the next middleware 


// app.use((req, res, next) => {})

// app.use((req, res, next) => {
//     console.log("logged from the middleware!!!")
// })

// Now as it stands, if we run npm start, with 
// the package.json "start": "nodemon app.js", 
// then go to localhost3000, we see our 
// string "logged from the middleware!!!" logged 
// everytime we refresh the page



// app.use((req, res, next) => {
//     console.log("DIFFERENT LOGGED FROM MIDDLEWARE!")
// })

// The reason why the above isn't logging our second 
// string, is because we need to call next from the 
// app.use 

app.use((req, res, next) => {
    console.log("logged from the middleware!!!");
     next(); // this allows the request to travel 
            // onwards to the next app.use
})

// Now it will go through all the middleware functions
// but only if we call next

app.use((req, res, next) => {
    console.log("DIFFERENT LOGGED FROM MIDDLEWARE!");
    next(); // <-- Allows the req to continue to the next 
            // middleware below
})

app.use((req, res, next) => {
    console.log("Last middleware log check");
    // we can chain on another next if we want 
    // our request to continue into another 
    // app.use, but this illustrates the concept!


    // But now that we have express, we have access
    // to a nice utility function called send: 

    // .send() allows us to send a response
    res.send('<h1>Hello There From Express!!</h1>')
    // And if we look in the network tab, we can 
    // see that 'Content-Type: text/html;' is auto 
    // set for us, this is a feature provided by 
    // the express send method automatically
})


// A key takeaway is that we travel from middleware 
// to middleware, by calling next()


// now we see both strings logged to the console!, also 
// remember to actually go to localhost:3000, otherwise 
// [nodemon] restarting due to changes...
// [nodemon] starting `node app.js`
// and nothing will be logged, just the nodemon messages


// app is now a valid request handler, so we 
// can pass app into our old server variable: 
// const server = http.createServer()
const server = http.createServer(app)

server.listen(3000)

