// Note this is just product.js singular, we 
// want to look at a single entity, our core 
// data is a product, we care about how these 
// individual products look and are structured 

// We can define this structuring in different 
// ways, we can use the Product constructor function 
// below 

//module.exports = function Product() {
// We call this function to create new products 
//}

// Or we could use classes instead: 

const fs = require('fs')
const path = require('path')


const products = [];

module.exports = class Product {
    constructor(t){
        // We then create a property using 
        // this.title = t, or the t(title) we're 
        // receiving
       this.title = t;
    };
   
   save(){
      // We use the save method to store the product 
      // in the products array
    //   products.push(this)
      // We push 'this' into products because 
      // this refers to the object created in the 
      // constructor, based on the class 

      // Now we utilize path: 

      const p = path.join(path.dirname(process.mainModule.filename),
         'data',
          'products.json');
         fs.readFile(p, (err, fileContent) => {
            console.log(err, fileContent)
            let products = [];
            if(!err){
               products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log('Error inside fs.writeFile line 50')
            })
         })
   };
   // We also want to be able to retrieve all products 
   // from that array, while save makes sense to 
   // call on a concrete instantiated object based 
   // on product so we'll add another method 
   static fetchAll(callback){
     // This is not called on a single instance of 
     // a product, because it needs to fetch all 
     // products and we don't want to create a new 
     // object with the new keyword therefore we 
     // prefix fetchAll with the static keyword 

     // Static ensures we can call this fetchAll 
     // method directly on the class itself, and 
     // not on an instantiated object

     // NOTE that the callback argument above will 
     // refer to: 

     /* 
        Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
          });
    });

    from the anonymous func inside the controller products.js 
     */
     const p = path.join(path.dirname(process.mainModule.filename),
     'data',
      'products.json');
     fs.readFile(p, (err, fileContent) =>{
       if(err){
        // return [];
        callback([]);
       }
       callback(JSON.parse(fileContent));
    })
    //  return products;
   };
};

// Now we can go back into the products.js controller 
// file