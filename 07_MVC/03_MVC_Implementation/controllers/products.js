// Now we need to add a link to this logic back 
// inside of our admin.js file, we do this with 
// exports 

// the syntax for doing the exports looks like 
// this: exports.nameOfFunction = 

// Also note we do need to transfer over 
// our products array from admin.js route

const products = [];


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
    products.push({ title: req.body.title });
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
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }

  // This is now a finished products controller, it 
  // controls all of our product related logic 