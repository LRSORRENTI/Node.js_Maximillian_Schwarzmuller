// Now we need to add a link to this logic back 
// inside of our admin.js file, we do this with 
// exports 

// the syntax for doing the exports looks like 
// this: exports.nameOfFunction = 

// Also note we do need to transfer over 
// our products array from admin.js route

// const products = [];
// we can now comment out the products array, since 
// we're handling it inside of our models folder, 
// in product.js 


const Product = require("../models/product.js")
// Now that we've imported our class 
// from the product.js file, we can use 
// it inside of postAddProduct

exports.getAddPRoduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  };

  // Then since we've now used the exports.function 
  // syntax, we now import that back inside of 
  // admin.js

  // We can repeat this exact process for adding 
  // a new product 

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

  // We also grab the logic from shop.js that's also 
  // involved in the products logic, and import 
// the exported getProducts controller logic into 
// the shop.js 
  exports.getProducts = (req, res, next) => {
    // const products = adminData.products;
    // also the above can be commented out, 
    // remember we moved the products array inside 
    // this file
    

    // Now inside of getProducts we want to fetch
    // the products we have saved inside of the 
    // products array in models/product.js
    // const products = Product.fetchAll()
    // we call Product.fetchAll and save it to 
    // the local products variable 
    // we also need to pass in a function to 
    // fetch all

    Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
          });
    });
    // res.render('shop', {
    //   prods: products,
    //   pageTitle: 'Shop',
    //   path: '/',
    //   hasProducts: products.length > 0,
    //   activeShop: true,
    //   productCSS: true
    // });
  }

  // This is now a finished products controller, it 
  // controls all of our product related logic 