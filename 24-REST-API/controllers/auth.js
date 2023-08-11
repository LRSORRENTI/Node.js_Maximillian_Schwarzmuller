const {validationResult} = require('express-validator/src/validation-result')

const User = require('../models/user');
// Inside our auth controller we need to bring in 
// our user model first 



exports.signup = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    // if we make it past the above if check we know we have 
    // the data we need 
    
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;


}