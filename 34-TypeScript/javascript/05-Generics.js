"use strict";
// TS Generics 
// Generics are types that are able to interact 
// with another type like: 
const dataArr = [];
// Above we have an array type, and wrapped inside 
// boolean type, now we have a generic
// Another generic example are promises 
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Resolves after 3s');
    }, 3000);
});
myPromise.then(result => {
    console.log(result);
}).catch(err => console.log(err));
