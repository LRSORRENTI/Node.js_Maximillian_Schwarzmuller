const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

// Now we can call the above to gain access to our 
// mongoDB cloud atlas database
class Product {
  constructor(title, price, description, imageUrl, id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongodb.ObjectId(id);
  }
  save(){
    const db = getDb();
    let dbOp;
    if(this._id){
      // if id is set update product
        dbOp = db
        .collection('products')
        .updateOne({_id: this._id }, {$set: this});
    } else {
      dbOp = db
      .collection('products')
      .insertOne(this)
    }
   return dbOp.then(result => {
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

  static findById(prodId){  
        const db = getDb();
        return db.collection('products')
        .find({_id: new mongodb.ObjectId(prodId)})
        .next()
        .then(product => {
          console.log(product);
          return product;
        })
        .catch(err => console.log(err));
      };

      // Now we'll add a static method for deleting 

      static deleteById(prodId){
        const db = getDb();
         return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
         .then(result => {
          console.log(`Deleted: ${result}`)
         } )
         .catch(err => console.log(err))
      }


    };



module.exports = Product;
