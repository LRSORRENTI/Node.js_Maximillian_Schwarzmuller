// Object and Array types in TS
const resultsArr: Array<number | string> = []
function printResult(resultObj: 
    // So inside this param defintion, we say we 
    // want resultObj to be of type Object, and it 
    // should have two fields, each with their own
    // required type, number and Date
    { 
      val: number,
      timestamp: Date 
    }){
    console.log(resultObj.val, resultObj.timestamp.toISOString())
    resultsArr.push(result, resultObj.timestamp.toISOString());
}
let result = 25;

printResult({val: result as number, timestamp: new Date()});

// Instead of just logging a result, let's store them 
// in an array: 

console.log(resultsArr)