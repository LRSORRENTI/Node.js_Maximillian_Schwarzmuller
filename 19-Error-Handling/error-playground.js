const sum = (a, b) => {
    if(a && b){
        return a + b
    }
    throw new Error('Invalid args');
}
try{
console.log(sum(2))
} catch (error){
    
    console.log(error, 'err occured')
}