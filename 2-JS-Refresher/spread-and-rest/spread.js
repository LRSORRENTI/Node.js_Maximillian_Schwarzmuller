let myArray = ['hello', 'my', 'name', 'is', 'luke']



const copiedArray = myArray.slice();
// slice copies a given array

// console.log(copiedArray)

//[ 'hello', 'my', 'name', 'is', 'luke' ] is 
// printed, slice can have arguments passed 
// in to narrow down the amount of items 
// in the array that are copied 

const newCopy = [myArray]

console.log(newCopy)

// [ [ 'hello', 'my', 'name', 'is', 'luke' ] ]

// So we created an array inside of an 
// array, but now we can use the spread 
// operator:

const newerCopy = [...myArray]

console.log(newerCopy)

console.log(...newerCopy)

// This technique is used commonly to 
// copy arrays 

const person = {
    first: 'Luke',
    last: 'Sorrenti',
    age: 29,

};

const spreadedPerson = {...person}

console.log(spreadedPerson)

// const twoSpreaded = [...spreaded]

// console.log(twoSpreaded)