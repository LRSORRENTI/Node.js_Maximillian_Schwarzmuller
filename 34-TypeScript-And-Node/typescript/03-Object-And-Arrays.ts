// Object and Array types in TS

function printResult(resultObj: 
    // So inside this param defintion, we say we 
    // want resultObj to be of type Object, and it 
    // should have two fields, each with their own
    // required type, number and Date
    { 
      val: number,
      timestamp: Date 
    }){
    console.log(resultObj.val)
}
let result = 25;

printResult({val: result as number, timestamp: new Date()});