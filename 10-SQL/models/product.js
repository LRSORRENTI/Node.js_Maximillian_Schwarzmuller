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
   // inside here we need to reach out to our 
   // MySQL database and save the data there 
  return  db.execute(
    'INSERT INTO products (title, price, imageURL, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description ]
   );
   // also not the (title, price, imageURL, description)
   // these MUST MATCH the fields from the products 
   // table in MySQL, if they don't match this will not 
   // work

   // We don't need to specify id before title above, 
   // because it will be generated and updated automatically
  
// TO SAFELY INSERT VALUES, AND NOT FACE THE CONSEQUENCES 
// OF SQL INJECTION (AN ATTACK PATTERN WHERE SOMEONE CAN 
// SPECIAL DATA INTO THE INPUT FIELDS IN THE WEBPAGE
// THAT RUN SQL QUERIES, WE USE ?, ?, ?, ?)
// ONE QUESTION MARK FOR EACH OF THE FIELDS

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