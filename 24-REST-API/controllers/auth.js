const User = require('../models/user');
// Inside our auth controller we need to bring in 
// our user model first 

exports.signup = (req, res, next) => {
    

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;


}