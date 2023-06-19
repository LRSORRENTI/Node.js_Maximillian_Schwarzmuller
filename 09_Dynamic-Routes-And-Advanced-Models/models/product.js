const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

// Inside of here we need to implement a way of 
// ensuring every products has a unique id, that 
// way we can implement a description for a 
// given product 

  save() {
    // We can do this inside of save
    // we can add this.id, which will add 
    // a new id prop to the product object
    // we currently have 

    // The ideal way is not math.random but for 
    // the purposes of learning it will suffice, 
    // there are better third party packages to 
    // create unique ID's but this will work for 
    // us 
    this.id = Math.random().toString();
    // after the above runs, we have a unique ID 
    // saved to the current instance of product 
    // using the 'this' keyword, and we generate 
    // a number with math.random, then convert 
    // it to a string with .toString()
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log('this:', this, 'err:',err,'p:', p, 'products:', products, 'null? yes it`s coming from models / \
        product.js, why is it null?', 'Product.id', products.id);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }


  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

}