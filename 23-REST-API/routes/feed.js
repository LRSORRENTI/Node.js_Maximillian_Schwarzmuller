const express = require('express');
// We're going to use this route for our feed, like 
// a news feed on a news website, or a posts feed on 
// a social media site 


// import the feed controller 
const feedController = require('../controllers/feed')

const router = express.Router();


// here is where we'll define some routes, first 
// to /posts where later on we'll have some posts 

// GET /feed/posts , any get requests will be handles 
// by this feedController controller
router.get('/posts', feedController.getPosts)
// so the getposts method is the function that should 
// execute for this route, and we also need to register 
// this route in app.js 

module.exports = router;