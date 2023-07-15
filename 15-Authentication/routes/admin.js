const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

// Now we import our is-auth.js check

const isAuth = require('../middleware/is-auth')

const router = express.Router();

// /admin/add-product => GET
// the below handlers are parsed from left to right, 
// so it makes sense to add the isAuth
// remember inside of is-auth:
// module.exports = (req, res, next) => {
//     if(!req.session.isLoggedIn){
//         return res.redirect('/login')
//     }
//     // so if we make it here, we're good to go, 
//     // we call next to allow the request to 
//     // continue on
//     next()
// }

// we called next, so the next middleware in line below,
// the adminController.getAddProduct is called
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth,  adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
