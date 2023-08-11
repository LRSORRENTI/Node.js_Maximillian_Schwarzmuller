const {validationResult} = require('express-validator/src/validation-result')
const bcrypt = require('bcryptjs');


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
    bcrypt.hash(password, 12).
    then(hashedPw => {
        const user = new User({
            email: email, 
            password: hashedPw,
            name: name
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({message: "User Created!", userid: result._id})
    })
    .catch(err => {
        if(!err.statusCode ){
            err.statusCode = 500;
        }
        next(err)
    }); 


}