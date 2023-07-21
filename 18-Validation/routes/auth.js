const express = require('express');
const { check } = require('express-validator/check');

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
router.post('/signup', check('email').isEmail().withMessage('Please enter a valid email'), authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
