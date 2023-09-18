const chai = require('chai')

const expect = chai.expect;

it('Should Add Numbers Correctly', function(){
    const num1 = 2;
    const num2 = 3;
    expect(num1 + num2).to.equal(5);
})


it('Uppercase the string', function(){
    let name = 'luke'
    name = name.toUpperCase();
    expect(name).to.equal('LUKE')
});