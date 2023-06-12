const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
// rootDir utility no longer in use

const productsController = require('../controllers/products.js')
// and by saving the logic of our exported products.js 
// file we can now pass that in as an argument inside 
// of router.get, where we used to house that 
// core controller functionality


const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', productsController.getAddPRoduct);
// Note that after we import productsController, and call 
// getAddProduct with dot notation, we don't add (), 
// we just need to pass a reference to the function, 
// we telling express, please store this function, and 
// when a request reaches the /add-product route, 
// then execute

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
