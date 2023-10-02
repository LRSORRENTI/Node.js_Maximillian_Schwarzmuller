"use strict";
function add(num1, num2) {
    console.log(num1 + num2);
    return num1 + num2;
}
add(1, 2);
let obj = {
    num1: 1,
    num2: 2,
    num3: 3
};
const btn = document.getElementById('btn');
const name1 = document.getElementById('name');
btn.addEventListener('click', () => {
    name1.style.textDecoration = 'underline';
    name1.style.textTransform = 'uppercase';
    name1.style.backgroundColor = 'lightgrey';
});
console.log(name1);
