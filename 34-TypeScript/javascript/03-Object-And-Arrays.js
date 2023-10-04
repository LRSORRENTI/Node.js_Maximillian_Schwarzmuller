"use strict";
// Object and Array types in TS
const resultsArr = [];
function printResult(resultObj) {
    console.log(resultObj.val, resultObj.timestamp.toISOString());
    resultsArr.push(result, resultObj.timestamp.toISOString());
}
let result = 25;
printResult({ val: result, timestamp: new Date() });
// Instead of just logging a result, let's store them 
// in an array: 
console.log(resultsArr);
