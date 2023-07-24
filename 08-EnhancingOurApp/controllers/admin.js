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
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;

    // const product = new Product(req.body.title);
    const product = new Product(title, imageURL, price, description);
    product.save();
    // Can also comment out products.push now since
    // we're utilizing the product.js file from 
    // models 
    // products.push({ title: req.body.title });
    res.redirect('/');
  };

  exports.getProducts = (req, res, next) =>{
    Product.fetchAll(products => {
        res.render('admin/products.ejs', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products.ejs'
        })
    })
  }