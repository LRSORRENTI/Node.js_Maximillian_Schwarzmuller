const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// This where we'll handle our dynamic route
// We do this by postfixing after /products a 
// colon and a name, the colon signals to 
// express.js that anything after the colon 
// is dynamic, it could be products/14325
// or products/75234, it's how we'll add dynamic 
// routes to our app, we use ':' and a name which 
// will be replaced by a unique value
router.get('products/:productId', shopController.getProduct);
// router.get('products/:productId')

// Now we can also connect the controller since 
// inside of controller/shop.js we added:
// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.productId
//     // remember inside of routes, productId 
//     // is the name we gave the router.get('/products/productId')
//      console.log(prodId)
//      res.redirect('/');
//   }
// router.get('products/:productId', shopController.getProduct);
// we pass the shopController.getProduct as the second 
// argument 


// Important to note, the order of the routes does 
// matter, if we added below: router.get('products/:rproductId')
// router.get('products/delete') we would never 
// reach the /delete route, the code is ran top to 
// bottom

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart );

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
