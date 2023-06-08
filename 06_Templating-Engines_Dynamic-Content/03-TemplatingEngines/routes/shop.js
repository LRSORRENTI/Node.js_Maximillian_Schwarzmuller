const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('shop.js', adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // now we need to change to our pug html
  res.render('shop');
  // render is a special method which will use the 
  // default templating engine 
});

module.exports = router;
