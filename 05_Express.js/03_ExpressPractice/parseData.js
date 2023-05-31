
// Let's now look at how we can handle incoming 
// requests, how we can extract data, and again 
// we want to handle a POST request



const express = require("express"); 

const app = express()

app.use('/', (req, res, next) => {
    // console.log("Always runs !");
    next();
})

app.use('/add-product', (req, res, next) => {
    // console.log('in another midware');
    // side note, returning html should be wrapped 
    // in all necessary HTML tags, but for learning 
    // purposes we'll just use the below 
    res.send(`<html><body><form action="/product" method="POST"> \
    <input type="text" \ 
    name="title"><button type="submit">Add product \
    </button></form></body></html>`);
    // Above we're simulating that this is a form 
    // that allows us to add a product for an online shop 
    
    // And since we added the form action to /product, 
    // we need a route to handle /product


});

app.use('/product', (req, res, next) => {
    // console.log("inside /product?");
    // we can utilize the .redirect method which 
    // is much easier than manuallysetting 
    //the status code and location header 

    console.log(req.body);
    // What happens if we look at request body? 
   res.redirect('/')

    // as a note: we can interchange app.use('/product)
    // and app.use('/add-product') because they have 
    // nothing in common, it just must come before the 
    // below app.use('/') because that '/' would execute 
    // prior to '/product' 
});

app.use('/', (req, res, next) => {
    // console.log('inside of a middleware');
    res.send('<h1> H1 sent by express!</h1>');
})

app.listen(3000)