"use strict";
// Type aliases, we can create these: 
let aName = "Trev";
let anAge = 32;
let JaliscoPerson = {
    currency: 'Peso',
    amount: 1000000000,
    country: 'Mexico',
    isNorthAmerican: true
};
class EuroPerson {
    constructor(inEurope, country, age, name) {
        this.inEurope = inEurope;
        this.country = country;
        this.age = age;
        this.name = name;
    }
    toString() {
        return `${this.name} is 
                ${this.age} years old, 
                lives in ${this.country}, 
                and is${this.inEurope ? '' : ' not'} 
                in Europe.`;
    }
}
const pierre = new EuroPerson(true, 'France', 30, 'Pierre');
console.log(pierre.toString());
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Teacher {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
function createPerson(type, name, age) {
    if (type === 'student') {
        return new Student(name, age);
    }
    else if (type === 'teacher') {
        return new Teacher(name, age);
    }
    else {
        console.error('Invalid type');
        return null;
    }
}
const person1 = createPerson('student', 'Alice', 20);
const person2 = createPerson('teacher', 'Bob', 30);
// const person3 = createPerson('invalid', 'Invalid', 40); 
// Error message is logged
console.log(person1);
console.log(person2);
// console.log(person3); 
// null, as an invalid type was passed
/*

In this example:

We define two classes,
Student and Teacher,
both implementing the Person interface.

We create a function createPerson
that takes a type parameter and
creates objects based on the type.

It performs conditional checks to
determine which type of object to create.

We use the createPerson function to
create instances of Student and
Teacher based on the type parameter.

If an invalid type is passed to createPerson,
it logs an error message and returns null.

This approach allows you to dynamically
create objects based on conditions and data,
which can be very useful when dealing with
large datasets or complex object creation logic.

*/ 
