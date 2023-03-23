function sayHi(){
    console.log('hello')
    console.log(this)
}

sayHi()

const person = {
    first: 'Wolfgang',
    middle: 'Amadeus',
    last: 'Mozart',
    isAlive: false,
    fullname: function(){
       let first = this.first;
       let last = this.last;
       let middle = this.middle;
        return (`My name is ${first} ${middle} ${last}`)
    },
    printBio(){
      const fullName = this.fullname()
      console.log(`${fullName} and I lived in Vienna`)
    }
}

person.printBio()