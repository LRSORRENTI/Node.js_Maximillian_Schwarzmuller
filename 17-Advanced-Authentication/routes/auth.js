const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword)
// the above needs to be token because in the getNewPassword 
// method we're looking for: 
// const token = req.params.token;
router.post('/new-password', authController.postNewPassword)
module.exports = router;