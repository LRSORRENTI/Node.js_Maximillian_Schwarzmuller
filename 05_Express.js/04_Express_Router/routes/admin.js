// We need to import express again
const path = require('path')

const express = require("express");

// Now we use a feature called 'router' 

const router = express.Router();

// And we import express router by calling it 
// Router()

// This router is like a mini express app, 
// tied to the other express app, or 
// pluggable into the other express app, which 
// we can export: 

// Now the below route is implicitly accessed with 
// the /admin/add-product from our app.use('/admin', adminRoutes)
// in the main app.js, we filter through admin

// router.get('/add-product', (req, res, next) => {
//     res.send(`<html><body><form action="/admin/product" method="POST"> \
//     <input type="text" \ 
//     name="title"><button type="submit">Add product \
//     </button></form></body></html>`);
// });

router.get('/add-product', (req, res, next) => {{
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
}})

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
});

// console.log(router)
// we can now import this router into the app.js file 

module.exports = router;