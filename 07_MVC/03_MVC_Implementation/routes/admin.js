const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
// rootDir utility no longer in use

const productsController = require('../controllers/products.js')
// and by saving the logic of our exported products.js 
// file we can now pass that in as an argument inside 
// of router.get, where we used to house that 
// core controller functionality

// const postAddProduct = require('../controllers/products.js')

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddPRoduct);
// Note that after we import productsController, and call 
// getAddProduct with dot notation, we don't add (), 
// we just need to pass a reference to the function, 
// we telling express, please store this function, and 
// when a request reaches the /add-product route, 
// then execute

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

exports.routes = router;
// we now no longer need to export products since 
// that is now located in controllers/products.js
// exports.products = products;

// But we also need to go into our main 
// app.js and modify the requires for the 
// adminData and shopRoutes variables 