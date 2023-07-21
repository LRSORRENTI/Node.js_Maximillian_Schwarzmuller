const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

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
.custom((value, {req}) => {
    if(value === 'forbidden@forbidden.com'){
        throw new Error('This email is forbidden');
    }
    return true;
}),
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
], authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
