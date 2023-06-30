// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  // we need to accept more data in the 
  // constructor
  constructor(username, email, cart, id){
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }
  save(){
    const db = getDb();
      return db.collection('users').insertOne(this);
    // .then()
    // .catch(err => console.log(err))
  }

// We can add a method for adding items 
// to cart, addToCart will be called on 
// a User object, using data fetched from the 
// database 

addToCart(product){
    // Now we can assume we have a cart 
    // property on our User, and we can 
    // check if the cart contains a product already
    const cartProductIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() === product._id.toString();

    });

    let newQuantity = 1;
        // const updatedCart = {items: [{...product, quantity: 1}]};
        const updatedCartItems = [...this.cart.items];
        // Above we create a new array where we spread 
        // in all the elements
        // And we can now edit the above updatedCartItems 
        // array W/O touching the old array due to the nature 
        // of JS reference primitive types
    
    if(cartProductIndex >= 0){
      // if true, it means this product already 
      // exists 
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
      // So above if we make it here we know that it exists, 
      // so we can set it's quantity to the new quantity

    } else{
        // else if the item does not exist yet
        updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity})
    }
    // product.quantity = 1;
    // the above is how we add properties on 
    // the fly in JavaScript, we can also 
    // add it below:

    const updatedCart = {
     items: updatedCartItems
    };
    const db = getDb();
    return db.collection('users').updateOne({_id: new ObjectId(this._id)},
    // The below will not merge the old cart with the 
    // updated cart, it will overwrite the old cart 
    // with the new cart 
    {$set: {cart: updatedCart}})
  }

  // Now let's imlement a getCart method: 

  getCart(){
    // Ideally we want to return the cart items 
    // the cart items should exist on the 
    // user who has this property, this is the 
    // mongoDB way of thinking about things, 
    // we don't need to reach out to some cart 
    //collection we can return a populated cart: 

    const db = getDb();
    // so we want to reach out the products collection
    // then we can use the .find() method to 
    // find all products in the cart, and in find
    // we can use special query syntax, we can 
    // say please find all products where _id is 
    // using special syntax with an object, we're 
    // looking for the $in: operator, this mongo operator 
    // takes an array of ID's and will return a cursor 
    // that contains references to every id in the array
    const productIds = this.cart.items.map((i) => {
      // in here we're mapping an array of items 
      // in the cart,that are objects into an array 
      // of just strings, saved into the productIds 
      // constant, then we pass that into the find method below
      return i.productId;
    })
    return db.collection('products')
    .find({_id: {$in: [productIds]}})
    .toArray()
    .then(products => {
      // in here we'll use a promise to 
      // return a mapped version of our data fresh 
      // from  MongoDB 
      return products.map(p => {
        // WE also want to return the quantity so 
        // we can use arrow funcs because they natively 
        // refer to the current state of 'this'

        return {...p, quantity: this.cart.items.find(i => {
          // what's going on here is we're comparing 
          // the product id to the product Id we get 
          // back from mongoDB
          return i.productId.toString() === p._id.toString();
        }).quantity
        }
      })
    })

  }

  static findById(userId){
    const db = getDb();
     return db.collection('users')
              .findOne({_id: new ObjectId(userId)})
              // .then(user => {
              //   console.log(user)
              //   return user
              // })
              //   .catch(err => console.log(err))
          
    }
}

module.exports = User;
