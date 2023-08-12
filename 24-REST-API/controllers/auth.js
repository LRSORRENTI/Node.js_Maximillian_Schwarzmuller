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
    // below is where we use bycrptjs, first arg is 
    // the password we extract from req.body.password, 
    // second arg is the salt, or amount of hashes, 12
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

// Implement login controller action: 

exports.login =  (req, res, next) =>  {

    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    // First need to check if the email exists, 
    User.findOne({email: email})
    .then(user => {
        if(!user){
            // if user is not defined:
            const error = new Error('User with this email was not found')
            error.statusCode = 401;
            throw error;
        }
        // So we make it past the above check, we know 
        // that email does exist, so we can proceed with 
        // validation
        loadedUser = user;
        // then we can set user to loadeduser, 
        // and use bcrypt to see if the passwords are 
        // matching, and we'll return the below 
        // since it gives a promise 
       return bcrypt.compare(password, user.password)
    }).then(isEqual => {
        if(!isEqual){
            // so if the passwords don't match, un equal 
            // then the user entered an invalid password 
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        // Finally if we make it past boththose checks 
        // above, so user has the email, has the matching 
        // password, we need to create a JWT JSON WEB TOKEN 

        
    })
    .catch(err => {
        if(!err.statusCode ){
            err.statusCode = 500;
        }
        next(err)
    })


}