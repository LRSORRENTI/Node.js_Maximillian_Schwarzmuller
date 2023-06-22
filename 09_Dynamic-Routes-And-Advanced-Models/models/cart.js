const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

 static deleteProduct(id, productPrice){
// first thing we need to do is gather the items 
// from the cart, we need to real the contents of 
// current items inside of cart 
fs.readFile(p, (err, fileContent) => {
        if(err){
          console.log('cart doesn`t exist' )
          // if somehow we can't find the cart, 
          // we return
          return
        }
        // we'll need to parse the cart from file 
        // content but for now let's use the 
        // spread operator
        const updatedCart = {...cart};
          const product = updatedCart.products.find(prod =>{
             prod.id === id
          });
            console.log('inside of deleteProduct cart.js, line \
            59:', product)
            const productQty = product.qty;
            // below we'll utilize the filter methd to run over 
            // all elements in there and keeps the ones that return 
            // true
            updatedCart.products = updatedCart.products.filter(prod => {
              prod !== id;
            })

            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
    
              fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err, 'err from inside of fs.writeFile, line 72 \
                of models/cart.js')
              })
            
          });
  };
};