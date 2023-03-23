const person = {
    name: 'Luke',
    age: 29,
    greet(){
        console.log(`hello my name is ` + this.name)
    }
}

const printName = (objData) => {
    console.log(objData.name)
}

printName(person)

// So another way to write the above using obj 
// destructuring is 

const logName = ({ name }) => {
    console.log(name)
}

logName(person)

// So we get the same output, but we're using 
// obj destructuring in the ( { name} ), 
// we could go even further: 

const logFullObj = ({name , age}) => { 
console.log(`Person: ${name}, age: ${age}`)
}

logFullObj(person)

// WE can pull these values out of the 
// obj completely with: 

const {name, age} = person;

console.log(name, age )

// We cam also destructure arrays: 

const music = ['blues', 'jazz', 'rock']

const [myMusic, myMusic2, myMusic3] = music;

console.log(myMusic, myMusic2, myMusic3)