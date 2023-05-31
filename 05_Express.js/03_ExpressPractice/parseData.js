
// Let's now look at how we can handle incoming 
// requests, how we can extract data, and again 
// we want to handle a POST request



const express = require("express"); 

const app = express()

app.use('/', (req, res, next) => {
    console.log("Always runs !")
    res.send()
})

app.use('/add-product', (req, res, next) => {
    console.log('in another midware')
    // side note, returning html should be wrapped 
    // in all necessary HTML tags, but for learning 
    // purposes we'll just use the below 
    res.send(`<html><body><form action="/product"> \
    method="POST \
    <input type="text" \ 
    name="title"><button type="submit">Add product \
    </button></form></body></html>`)
})

app.listen(3000)