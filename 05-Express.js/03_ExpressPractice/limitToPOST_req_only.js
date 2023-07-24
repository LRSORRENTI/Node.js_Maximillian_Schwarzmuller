// We can parse request bodies with the help 
// of the body parser package, but we have a problem
// The below middleware always executes, not just 
// for POST requests but also GET requests 

// How can we fix this? 

// We can utilize app.get(), app.get has the 
// same syntax structure as app.use, we can 
// use a path, but it will only ever execute 
// for incoming GET requests 

// And in the same vein we have app.post, which 
// also has the same syntax structure as app.use, but 
// this will only fire for POST requests 

const express = require("express"); 
const bodyParse = require("body-parser")

const app = express()

app.use(bodyParse.urlencoded({extended: false}));


app.use('/add-product', (req, res, next) => {
    res.send(`<html><body><form action="/product" method="POST"> \
    <input type="text" \ 
    name="title"><button type="submit">Add product \
    </button></form></body></html>`);
});


app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
});

app.use('/', (req, res, next) => {
    res.send(`<h1>Hello from EXPRESS!</h1>`)
});

// app.post()

// app.get()

app.listen(3001)