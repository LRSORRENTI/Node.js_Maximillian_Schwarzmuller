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
  const product = new Product(null, title, imageUrl, description, price);
  // we meed to add null as a first arg, 
  // because of id in the constructor, if id doesn't 
  // yet exist it's null, if if null then create a new 
  // id with the this.id=Math.random block
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    res.redirect('/')
  }
  const prodId = req.params.productId;

  Product.findById(prodId, product => {
    if(!product){
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode, 
      product: product
    });
  });
};


exports.postEditProduct = (req, res, next ) =>{
  // inside here, we first need to fetch info 
  // about the product 
  // and remember we changed the editprod.ejs: 

  // <% if(editing) { %>
  //   <input type="hidden" value="<%= product.Id %>" name="productId">
  //  <%  } %> 
 // so now we can: 
 const prodId = req.body.productId;
 const updatedTitle = req.body.title;
 const updatedPrice = req.body.price;
 const updatedImagUrl = req.body.imageUrl;
 const updatedDesc = req.body.description;
 // caveat is these keys following body. must match the 
 // the names in the views 
 // and now with all of the data, we can create: 
const updatedProduct = new Product(prodId,
   updatedTitle, 
   updatedImagUrl,
    updatedDesc, 
    updatedPrice );
// now we can :
updatedProduct.save()
res.redirect('/admin/products')
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
