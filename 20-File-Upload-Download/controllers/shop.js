const fs = require('fs')
const path = require('path')

const Product = require('../models/product');
const Order = require('../models/order');


exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


// // remember inside of the routes we added: 
// router.get('/orders/:orderId', isAuth, shopController.getInvoice)
// and our pdf is always invoice- + randomOrderIdValue

// exports.getInvoice = (req, res, next) => {
//   const orderId = req.params.orderId;
//   const invoiceName = 'invoice-' + orderId + '.pdf';
//   const invoicePath = path.join('data', 'invoices', invoiceName)
  
// we use the path module from node which 
  // normalizes paths for us in case we're on 
  // windows, linux or mac '/' vs '\' 

  // readfile gives a callback function
  // fs.readFile(invoicePath, (error, data) => {
  
  // we'll get either an error or data, 
    // the data will be in the format of a buffer 
    // if(error){
    //   return next(error)
    // }
    
    // // the response we send should be the file, 
    // housed in the data param 
//     res.send(data)
//   })
// }


exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
  .then(order => {
    if(!order){
        return next(new Error('No order found'));
    }
    if(order.user.userId.toString() !== req.user._id.toString()){
        // So if the above is true, if it's not equal then return
      return next(new Error('Unauthorized Access'))
    }
    const invoiceName = 'invoice-' + orderId + '.pdf';
    const invoicePath = path.join('data', 'invoices', invoiceName)
  
  // fs.readFile(invoicePath, (error, data) => {
  //   if(error){
  //     return next(error)
  //   }
  //   res.setHeader('Content-Type', 'application/pdf' );
  //   res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
  
  // res.send(data);
  // });
  // Instead of reading the entire file, which if it's a 
  // large file will take a lot of time, we'll instead 
  // stream it

  const file = fs.createReadStream(invoicePath);
// now node can read stream step by step in chunnks

res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
file.pipe(res);
// And we'll use the pipe method, which can pipe data that's 
//  read into my response object, we can use read streams 
// to pipe into writable streams 

// Not every object is writable, but the response 
// object is 

// Once we do this the response will be streamed to 
// the browser step by step, for large files this 
// is a bonus, because node doesn't then need to 
// pre-load all the data in memory like in the 
// readFile method, instead it streams the large 
// data on the fly

 })
 .catch(err => {
  console.log(err)
 })
}