// Inside this file we'll manage our authentication
// related routes 

// For this we'll need the same intital setup 
// where we bring in express and express.Router:

const express = require('express');

const authController = require('../controllers/auth')

const router = express.Router();

// For now we need a get route for the login page, 
// we also need to register the route in the main
// app.js

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

router.post('/logout', authController.postLogout)

module.exports = router;