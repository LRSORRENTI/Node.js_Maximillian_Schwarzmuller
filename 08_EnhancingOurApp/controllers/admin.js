const Product = require("../models/product.js")


exports.getAddPRoduct = (req, res, next) => {
    res.render('admin/add-product.ejs', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  };



exports.postAddProduct = (req, res, next) => {
    // below we now use that class we imported 
    // call the new keyword, pass in the same 
    // req.body.title, then we call save to 
    // save that instantiation to the products array 
    // inside of the models/product.js file 
    const product = new Product(req.body.title);
    product.save();
    // Can also comment out products.push now since
    // we're utilizing the product.js file from 
    // models 
    // products.push({ title: req.body.title });
    res.redirect('/');
  };