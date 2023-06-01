const ExpressJS = require("express");

const app = ExpressJS()

// app.use('/', (req, res, next) => {
//     res.send("<h1>h1 sent?</h1>")
//     console.log("working?")
// })

// app.use('/', (request, response, next) =>{
//     console.log('hello?')
//     response.send()
//     console.log("HELLO THERE")
//     next()
// })

// app.use('/', (request, response, next) =>{
//     console.log('hello from second?')
//     response.send()
//     console.log("HELLO THERE SECOND?")
// })

/*

hello?
HELLO THERE
hello from second?
HELLO THERE SECOND?


*/

app.use('/users', (request, response, next) => {
    console.log("from /users????")
    response.send(`<p>I am inside '/users' ????</p>`)
    next()
})


app.use('/', (request, response, next) =>{
    console.log(`hello from '/'!!!`)
    response.send(`<h1>HELLO FROM '/'!!</h1>`)
})

// app.use('/users', (request, response) => {
//      console.log("from /users?")
//      response.send(`<p>I am inside '/users' ?</p>`)
// })


// app.listen(3001)