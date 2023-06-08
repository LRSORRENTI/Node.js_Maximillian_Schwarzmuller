const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('shop.js', adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // now we need to change to our pug html
  const products = adminData.products;
  // we need to extract the data houseed in
  // .products and render it dynamically, 
  // to achieve this we pass in a second 
  // argument below
  // res.render('shop');
  res.render('shop', {prods: products, docTitle: 'Pug Shoppe'});
  // now back in our pug file, shop.pug we can 
  // access prods 
  // render is a special method which will use the 
  // default templating engine 
});

module.exports = router;
