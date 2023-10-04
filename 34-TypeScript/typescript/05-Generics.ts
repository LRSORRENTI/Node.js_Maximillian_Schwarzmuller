// TS Generics 

// Generics are types that are able to interact 
// with another type like: 

const dataArr: Array<boolean> = [];

// Above we have an array type, and wrapped inside 
// boolean type, now we have a generic

// Another generic example are promises 

const myPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve('Resolves after 3s')
    }, 3000)
})

myPromise.then( result =>{
    console.log(result.split(' '))
}).catch(err => console.log)