// So what is async? Well a good way to illustrate 
// the concept is with setTimeout(), this 
// func will execute after a certain amount 
// of time has passed, the first arg is the code 
// to be executed, the second arg is the time specification
// which is expressed in milliseconds, so 2 second 
// would be 2000

const { rejects } = require("assert");
const { resolve } = require("path");

setTimeout(() => {
    console.log('2 second timer is done ')
}, 2000)

// This is async code b/c it waits
// a given amount of time  before executing,

console.log('I execute before the async func above')

// So we see the above logs immediately and the async 
// code waits 2 seconds 

// So the callback function setTimeout is the old
// way and we'll see and use it quite a lot, but 
// there are other async formulas

const fetchData = (callback) => {
    setTimeout(() =>{
       callback('done!!')
    }, 4000);
}

setTimeout(() => {
    console.log('fetchData 4 second callback timer is now done ');
    fetchData(text => {console.log(text)})
}, 6000)

// So above we have quite a lot of calling back going 
// on, which is where promises come in to play

const fetchNewData = () => {
    // we create a promise by saving it 
    // to a variable inside of our callback
    // function
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('done!');
         }, 4000);
    });
    return promise;
 };



 setTimeout(() => {
    console.log('fetchData 4 second callback timer is now done ');
   fetchNewData().then(text => {
    console.log(text);
    return fetchNewData();
   }).then(text2 => {
    console.log(text2)
   });
}, 6000)
