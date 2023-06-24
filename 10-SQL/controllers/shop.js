const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  // res.render('shop/product-list', {
  //   prods: products,
  //   pageTitle: 'All Products',
  //   path: '/products'
  // });
  .then( ([rows]) => {
    // now we can use the above vars which hold
    // our nested arrays 
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
      });
   
  })
  .catch(err => console.log(err))
};

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId, product => {
//     res.render('shop/product-detail', {
//       product: product,
//       pageTitle: product.title,
//       path: '/products'
//     });
//   });
// };


exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product]) => {
    res.render('shop/product-detail', {
      product: product[0],
      // important to note, we neeeded to pass in 
      // index 0 above [0], without it the product 
      // details page didn't render 
      pageTitle: product.title,
      path: '/products'
    })
  }).catch(err => {
    console.log(err)
  })
};


// exports.getIndex = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/index', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/'
//     });
//   });
// };
// Now we restructure the above, because 
// we're now working with promises 
exports.getIndex = (req, res, next) => {
  // fetchAll will now return a promise
  Product.fetchAll()
  .then( ([rows, fieldData]) => {
    // now we can use the above vars which hold
    // our nested arrays 
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
      });
   
  })
  .catch(err => console.log(err))
  // and yes, if we go to localhost 3000 
  // we indeed see the product with all 
  // the correct information from our 
  // mySQL database 
  };


exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
