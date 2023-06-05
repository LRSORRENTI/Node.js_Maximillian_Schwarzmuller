// We need to import express again
const express = require("express")

// Now we use a feature called 'router' 

const router = express.Router();

// And we import express router by calling it 
// Router()

// This router is like a mini express app, 
// tied to the other express app, or 
// pluggable into the other express app, which 
// we can export: 

router.get('/add-product', (req, res, next) => {
    res.send(`<html><body><form action="/product" method="POST"> \
    <input type="text" \ 
    name="title"><button type="submit">Add product \
    </button></form></body></html>`);
});


router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
});

module.exports = router;