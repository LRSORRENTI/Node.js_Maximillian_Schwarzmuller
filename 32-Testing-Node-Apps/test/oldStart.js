// const chai = require('chai')

// const expect = chai.expect;

// it('Should Add Numbers Correctly', function(){
//     const num1 = 2;
//     const num2 = 3;
//     expect(num1 + num2).to.equal(5);
// })


// it('Uppercase the string', function(){
//     let name = 'luke'
//     name = name.toUpperCase();
//     expect(name).to.equal('LUKe')
// });

/* 
npm test

> nodejs-complete-guide@1.0.0 test
> mocha



  ✔ Should Add Numbers Correctly
  1) Uppercase the string

  1 passing (9ms)
  1 failing

  1) Uppercase the string:

      AssertionError: expected 'LUKE' to equal 'LUKe'
      + expected - actual

      -LUKE
      +LUKe
      
      at Context.<anonymous> (test/start.js:15:21)
      at process.processImmediate (node:internal/timers:476:21)
*/