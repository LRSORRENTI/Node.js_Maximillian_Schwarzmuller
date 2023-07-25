
// Let's now look at how we can handle incoming 
// requests, how we can extract data, and again 
// we want to handle a POST request



const express = require("express"); 

const app = express()

// app.use('/', (req, res, next) => {
//     // console.log("Always runs !");
//     next();
// })


// Below is our parser, to parse the inputted 
// req.body, but we need a third party package
// called body-parser, so enter 'npm install --save body-parser'

const bodyParse = require("body-parser");

// and now that we've got it in our package.json, 
// let's use it 

// app.use(bodyParse.urlencoded())

// Also note, apparently we need to add: 

app.use(bodyParse.urlencoded({extended: false}));
// if we omit the extended: false, we see: 

// Wed, 31 May 2023 13:28:40 GMT body-parser 
// deprecated undefined extended: 
// provide extended option at parseData.js:27:19

// So we call app.use, then bodyParse.urlencoded(), 
// important to note we need to execute with () b/c 
// it registers a middlewar, important side-note. 
// this method works for us, but it wouldn't work if 
// we needed to parse a jsonfile or other file type, 
// it works well for us in this instance with our 
// text from the submit form

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

    console.log(1, req.body);
    // What happens if we look at request body? 
    // Well we see undefined is logged, why is that?
    // it's because express doesn't auto-parse, we need 
    // to register a parser

    // And yes, now in the console, we see the req.body 
    // was now parsed with our body-parser package, 
    // { title: 'Summa Theologica' }
    // is logged to the console 

    // Which is much simpler than the old approach 
    // we took in the first few lectures where we 
    // did all of this work manually, this is the 
    // benefit express.js gives us 

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