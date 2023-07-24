
const path = require('path')

const express = require("express");


const rootDir = require('../utils/path.js')


const router = express.Router();


router.get('/contact', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
    // change to: 
    res.sendFile(path.join(rootDir, 'views', 'contact.html'))
})

module.exports = router;