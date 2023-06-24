const db = require('../util/database.js')

const Cart = require('./cart');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   
  }

  static deleteById(id) {
  
  }

  static fetchAll() {
   return db.execute('SELECT * FROM products');
  }

  static findById(id) {

  }
};
// Above we were fetching data from files, 
// in the real world, we work with databases,
// not local files 

// we still want to use static methods, but 
// instead of fetching from a file, fetch from 
// a database, so now we can remove, the fs and 
// path module imports 