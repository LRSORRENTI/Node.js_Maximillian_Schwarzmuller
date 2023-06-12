// Now we need to add a link to this logic back 
// inside of our admin.js file, we do this with 
// exports 

// the syntax for doing the exports looks like 
// this: exports.nameOfFunction = 


exports.getAddPRoduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

  // Then since we've now used the exports.function 
  // syntax, we now import that back inside of 
  // admin.js