const express = require('express');
// We're going to use this route for our feed, like 
// a news feed on a news website, or a posts feed on 
// a social media site 

const { body } = require('express-validator/src/')
// above we bring in the check and body methods from 
// express-validator

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


// and here, between '/post', and the controller action, 
// we'll add an array of middleware
router.post('/post',
 [ body('title').trim().isLength( {min: 5} ),
   body('content').trim().isLength( {min: 5} )

],
feedController.createPost)

// below we'll add another route, a route to get 
// a single post, where we use the :postid,
// postid being a dynamic param, because we'll encode 
// the unique post id into the url 

router.get('/post/:postId', feedController.getPost)


router.put('/post/:postId',
[ body('title').trim().isLength( {min: 5} ),
body('content').trim().isLength( {min: 5} )

], 
  feedController.updatePost
 );

 router.delete('/post/:postId', feedController.deletePost)

module.exports = router;