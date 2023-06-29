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
    // const cartProduct = this.cart.items.findIndex((cp) => {
    //     return cp._id === product._id;

    // });
    // product.quantity = 1;
    // the above is how we add properties on 
    // the fly in JavaScript, we can also 
    // add it below:
    // const updatedCart = {items: [{...product, quantity: 1}]};
    const updatedCart = {items: [{productId: new ObjectId(product._id), quantity: 1}]};
    const db = getDb();
    return db.collection('users').updateOne({_id: new ObjectId(this._id)},
    // The below will not merge the old cart with the 
    // updated cart, it will overwrite the old cart 
    // with the new cart 
    {$set: {cart: updatedCart}})
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
