// We need to import express again
const path = require('path')

const express = require("express");


const rootDir = require('../utils/path.js')


const router = express.Router();


router.get('/', (req, res, next) => {{
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
      res.sendFile(path.join(rootDir, 'views', 'blog.html'))
}})



module.exports = router;