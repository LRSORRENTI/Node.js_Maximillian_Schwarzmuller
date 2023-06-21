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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
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
    
    // after the above runs, we have a unique ID 
    // saved to the current instance of product 
    // using the 'this' keyword, and we generate 
    // a number with math.random, then convert 
    // it to a string with .toString()
    getProductsFromFile(products => {
      if(this.id){
        // if id already exists:
        const existingProductIndex = products.findIndex(prod =>  prod.id === this.id)
        const updatedProducts = [...products];
        updatedProducts(existingProductIndex) = this;
        // we set it equal to this because right now this 
        // is the value of the updated product
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log('this:', this, 'err:',err,'p:', p, 'products:', products, 'null? yes it`s coming from models / \
          product.js, why is it null?', 'Product.id', products.id);
        });
      } else {
      // we also move the id creation in here, 
      // but after the if statement, b/c we only 
      // want to create this if id doesn't exist yet
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log('this:', this, 'err:',err,'p:', p, 'products:', products, 'null? yes it`s coming from models / \
        product.js, why is it null?', 'Product.id', products.id);
      });
    }
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