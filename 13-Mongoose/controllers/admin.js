const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(
  //   title,
  //   price,
  //   description,
  //   imageUrl,
  //   null,
  //   req.user._id
  // );
  const product = new Product({
    // now inside of our new product 
    // constructor we pass in a single object
    // where we map the values defined in our 
    // schema 
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    // below gives access to user id and assigns it
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // const product = new Product(
  //   updatedTitle,
  //   updatedPrice,
  //   updatedDesc,
  //   updatedImageUrl,
  //   prodId
  // );
  // So instead of the above, where we create 
  // a product, then call .save, we'll find the 
  // product
  Product.findById(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    return product.save()
    // now we have a setup where we find 
    /// a product, and get back a full mongoose 
    // object, we then call save on it, then 
     // redirect after save is executed
  })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll()
  // Again we change fetchAll to 
  // find since we're using mongoose
  // Product.find()
  // Mongoose has a useful utility method
  // we can implement called populate, 
  // which populates a field with all info,
  // instead of just the id
  // .populate('userId')
  //   .then(products => {
  //     console.log(products)
      /* 
      [
  {
    _id: 64a2cecf1d156b25d41f069b,
    title: 'A nice book',
    price: 24.99,
    description: 'Lorem ipsum',
    imageUrl: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
    userId: {
      cart: [Object],
      _id: 64a1947fb3829883c8589d0e,
      name: 'Luke',
      email: 'email@myNewEmail.com',
      __v: 0
    },
    __v: 0
  }
]
// Now we have all the data, instead of writing 
// nested queries 
*/
Product.find()
// after find we can also call .select(), 
// maybe we just want the title and the price, 
// but we don't care for any other fields, and 
// we can even exclude fields by prefixing a '-'
// like -_id
// .select('title price -_id')
// .populate('userId', 'name')
// now we see in the console: 
/*
[
  {
    title: 'A nice book',
    price: 24.99,
    userId: { _id: 64a1947fb3829883c8589d0e, name: 'Luke' }
  },
  {
    title: 'A nice book',
    price: 24.99,
    userId: { _id: 64a1947fb3829883c8589d0e, name: 'Luke' }
  }
]
*/
    .then(products => {
      console.log(products)
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.deleteById(prodId)
  // in mongoose we have a new method: 
  Product.findByIdAndRemove(prodId)
  // this method will remove a document
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
