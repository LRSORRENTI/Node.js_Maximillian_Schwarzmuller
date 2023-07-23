const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const User = require('../models/user')

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [
  body('email')
  .isEmail()
  .withMessage('Please enter a valid email address')
  .normalizeEmail(),
  body('password', 'Password must be valid')
  .isLength({ min: 5 })
  .isAlphanumeric()
  .trim()
],

authController.postLogin
);

// for the below post route we'll add another middleware,
// remember we can add as many middlewares as we want, and we 
// pass in 'email' since that's the name="email" from our
// signup.ejs template
// router.post('/signup', check('email').isEmail(), authController.postSignup);

// We can also chain on the withMessage method

// router.post('/signup', check('email').isEmail().withMessage().isAlphanumeric(), authController.postSignup);
// we can chain on as many checks as we want like isAlphanumeric to check 
// that all values are Aa-Zz and 0-9
router.post('/signup', [
 check('email').
isEmail()
.withMessage('Please enter a valid email')
.custom((value, {req} ) => {
    // if(value === 'forbidden@forbidden.com'){
    //     throw new Error('This email is forbidden');
    // }
    // return true;
   return User.findOne({ email: value })
    .then(userDoc => {
      if (userDoc) {
        // req.flash(
        //   'error',
        //   'E-Mail exists already, please pick a different one.'
        // );
        // return res.redirect('/signup');
        // instead of the above we'll return a new 
        // Promise.reject call, this is a built in 
         // JS object
        return Promise.reject('Email exists, please pick another')
        // this is how we can add our own async validation, 
        // since express needs to reach out to our MongoDB
        // cloud atlas, express validator will wait for us
        // 
      }
    
    })
}).normalizeEmail(),

body('password', 'Please enter a password with numbers, text, at least 5')
// now we can also omit the withMessage method, and just 
// pass in the above string as a second argument for a default 
// message for any password check fail, otherwise we'd need 
//  to chain withMessage for every check
.isLength({min: 5, max: 40})
// In production you'd want to specify a much more secure 
// password, increasing the min amount,
// and of course omitting .isAlphanumeric so !@#$ 
// special characters are also valid for better security
.isAlphanumeric()
.trim(),
body('confirmPassword')
.trim()
.custom((value, {req}) => {
    // so if the value passsed is not the 
    // same as confirmPassword, throw the error
    if(value !== req.body.password){
        throw new Error('Password must match!')
    }
    return true
    // also we don;t need to chain on te 
    // .isLength and isAlphanumeric because we 
    // already checked in the first field, so 
    // we wouldn't ever logically need to check 
    // in the confirm password field since the 
    // check in the password field would fail
})
], authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
