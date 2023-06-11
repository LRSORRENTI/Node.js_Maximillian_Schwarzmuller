
const path = require('path')

const express = require("express");


const rootDir = require('../utils/path.js')


const router = express.Router();


router.get('/users', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'user.ejs'))
})

module.exports = router;