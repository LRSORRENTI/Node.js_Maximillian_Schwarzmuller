
const path = require('path')

const express = require("express");

const router = express.Router();

// router.get('/', (req, res, next) =>{
//     res.send('<h1>Hello from express!</h1>')
// });

// instead of sending the dummy html h1 tag, let's 
// send an html file:

// we do this with the sendFile from the res 
// object


// we also need to use the path core node module to 
// construct the path for us, this is because on 
// windows the paths are with '\' and linux are '/' 
// so with the path.join(__dirname, 'views', 'shop.html')
// the correct path will be constructed for us 
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
})

module.exports = router;