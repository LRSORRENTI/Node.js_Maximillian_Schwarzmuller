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
      products.push(this)
      // We push 'this' into products because 
      // this refers to the object created in the 
      // constructor, based on the class 
   };
   // We also want to be able to retrieve all products 
   // from that array, while save makes sense to 
   // call on a concrete instantiated object based 
   // on product so we'll add another method 
   static fetchAll(){
     // This is not called on a single instance of 
     // a product, because it needs to fetch all 
     // products and we don't want to create a new 
     // object with the new keyword therefore we 
     // prefix fetchAll with the static keyword 

     // Static ensures we can call this fetchAll 
     // method directly on the class itself, and 
     // not on an instantiated object
     return this.products;
   };
};

// Now we can go back into the products.js controller 
// file