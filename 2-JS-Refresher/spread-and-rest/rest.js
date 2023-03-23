

const toArray =  (arg1, arg2, arg3) => {
   return[arg1, arg2, arg3]
}

console.log(toArray(1, 2, 3))

// If we wanted to be able to pass in four 
// or howwever many extra arguments to 
// return in toArray we can use the rest operator 

const anotherArray = (...args) => {
    return [args]
}

console.log(anotherArray(1, 2, 4, 5, 6, 7, 8))


// [
//   [
//     1, 2, 4, 5,
//     6, 7, 8
//   ]
// ]

// So ... is the  rest operator if you are 
// adding args into an array 

// And ... is the spread if used to copy items 
// out of an array