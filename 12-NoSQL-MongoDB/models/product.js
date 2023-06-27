const getDb = require('../util/database').getDb;

// Now we can call the above to gain access to our 
// mongoDB cloud atlas database
class Product {
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save(){
    const db = getDb();
   return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
    })
            .catch(err => {
                 console.log(err);
    })
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
}



module.exports = Product;
