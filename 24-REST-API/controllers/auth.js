// const {validationResult} = require('express-validator/src/validation-result')
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const User = require('../models/user');

// // Inside our auth controller we need to bring in 
// // our user model first 



// exports.signup = (req, res, next) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         const error = new Error('Validation Failed');
//         error.statusCode = 422;
//         error.data = errors.array();
//         throw error;
//     }
//     // if we make it past the above if check we know we have 
//     // the data we need 

//     const email = req.body.email;
//     const name = req.body.name;
//     const password = req.body.password;
//     // below is where we use bycrptjs, first arg is 
//     // the password we extract from req.body.password, 
//     // second arg is the salt, or amount of hashes, 12
//     bcrypt.hash(password, 12).
//     then(hashedPw => {
//         const user = new User({
//             email: email, 
//             password: hashedPw,
//             name: name
//         });
//         return user.save();
//     })
//     .then(result => {
//         res.status(201).json({message: "User Created!", userid: result._id})
//     })
//     .catch(err => {
//         if(!err.statusCode ){
//             err.statusCode = 500;
//         }
//         next(err)
//     }); 


// }

// // Implement login controller action: 

// exports.login =  (req, res, next) =>  {

//     const email = req.body.email;
//     const password = req.body.password;
//     let loadedUser;
//     // First need to check if the email exists, 
//     User.findOne({email: email})
//     .then(user => {
//         if(!user){
//             // if user is not defined:
//             const error = new Error('User with this email was not found')
//             error.statusCode = 401;
//             throw error;
//         }
//         // So we make it past the above check, we know 
//         // that email does exist, so we can proceed with 
//         // validation
//         loadedUser = user;
//         // then we can set user to loadeduser, 
//         // and use bcrypt to see if the passwords are 
//         // matching, and we'll return the below 
//         // since it gives a promise 
//        return bcrypt.compare(password, user.password)
//     }).then(isEqual => {
//         if(!isEqual){
//             // so if the passwords don't match, un equal 
//             // then the user entered an invalid password 
//             const error = new Error('Wrong Password');
//             error.statusCode = 401;
//             throw error;
//         }
//         // Finally if we make it past boththose checks 
//         // above, so user has the email, has the matching 
//         // password, we need to create a JWT JSON WEB TOKEN 

//         const token = jwt.sign({
//             email: loadedUser.email,
//             // we convert the _id to a string since it's 
//             // a mongodb object
//             userid: loadedUser._id.toString()
//         },
//             // then as a second arg, after the object argument 
//             // we pass in a secret, in a real application 
//             // you'd use a very long string
//             // from the jsonwebtoken docs: 
//             /*  

//             secretOrPrivateKey is a string (
//                 utf-8 encoded), buffer, object,
//                  or KeyObject containing either 
//                  the secret for HMAC algorithms 
//                  or the PEM encoded private
//                   key for RSA and ECDSA. 
                  
//                   In case of a private key 
//                   with passphrase an object 
//                   { key, passphrase } 
//                   can be used (based on crypto
//                      documentation), in this 
//                      case be sure you pass the 
//                      algorithm option. 
                     
//                      When signing with RSA 
//                      algorithms the minimum modulus 
//                      length is 2048 except when the 
//                      allowInsecureKeySizes option 
//                      is set to true. 
                     
//                      Private keys below this size 
//                      will be rejected with an error.

//             */
//                     'secret-which-should-be-longer',
//                     // third arguemt is the expire date for the JWT 
//                     {
//                         expiresIn: '1h'
//                         // JWT will expire in 1 hour, '1h'
//                         // the expiration is not optional, it must 
//                         // always expire, if a bad actor got access to a 
//                         // token, and that token was valid forever, 
//                         // that wouldn't be very secure 
//                     }
//         )

//         // now that we have a token above, which expires in an 
//         // hour, we now return a response: 

//         res.status(200).json({
//             token: token,
//             userid: loadedUser._id.toString()
//         })

//        // after installing the jsonwebtoken package, 
//        // we import it, and use the sign method to 
//        // generate a token 
//     })
//     .catch(err => {
//         if(!err.statusCode ){
//             err.statusCode = 500;
//         }
//         next(err)
//     })


// }


const { validationResult} = require('express-validator/src/middlewares/check')
// const { validationResult } = require('express-validator/declarations/validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        // 'secret-which-should-be-longer'
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUserStatus = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ status: user.status });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUserStatus = (req, res, next) => {
  const newStatus = req.body.status;
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      user.status = newStatus;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
