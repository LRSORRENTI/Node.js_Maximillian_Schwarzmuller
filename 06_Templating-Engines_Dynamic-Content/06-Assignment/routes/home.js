
const path = require('path')

const express = require("express");


const rootDir = require('../utils/path.js')


const router = express.Router();


router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'home.ejs'))
})

module.exports = router;