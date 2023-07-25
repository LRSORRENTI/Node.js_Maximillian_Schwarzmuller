const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
// const adminData = require('./admin');
// The above imports can be commented out, as 
// we've now moved the logic into our controller 
const shopController = require('../controllers/shop.js')

const router = express.Router();

 router.get('/', shopController.getIndex
// (req, res, next) => {
//   const products = adminData.products;
//   res.render('shop', {
//     prods: products,
//     pageTitle: 'Shop',
//     path: '/',
//     hasProducts: products.length > 0,
//     activeShop: true,
//     productCSS: true
//   });
// });
 );

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/checkout', shopController.getCheckout)

module.exports = router;
