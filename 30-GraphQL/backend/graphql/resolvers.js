// The resolver is an exported object where we 
// need a hello method from our schema.js definition
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Post = require('../models/post');
const { clearImage } = require('../util/file')


module.exports = {
    // createUser(args, req){
        
    //      const email = args.userInput.email;
    // }

    // Above is one way to get the data from the schema: 
    // schema.js:
    // type RootMutation {
    //     createUser(userInput: UserInputData): User!
    //  }

    // We can also use object destructuing: 

    createUser: async function({ userInput }, req ){
      // Add validation logic:
      const errors = [];
      if(!validator.default.isEmail(userInput.email)){
        // so if the user input email is not an email 
        // address
        errors.push({message: 'Email invalid!'})
      }
      if(validator.default.isEmpty(userInput.password) || 
      !validator.default.isLength(userInput.password, {min: 5})){
            errors.push({message: 'Password too short!' })    
       }
      // Now that above we have all these if checks, 
      // we check to see if the erorrs array has a lentgth 
      // greater than zero, then  we know we've got 
      // some problems :

      if(errors.length > 0){
        const error = new Error('Invalid Input');
        error.data = errors;
        error.code = 422;
        throw error;
      }
        // const email = userInput.email
        const existingUser = await User.findOne({email: userInput.email})
        if(existingUser){
            // if a user exists, then we know we don't create 
            // a new one 
            const error = new Error('User already exists')
            throw error;
        }
        const hashedPw = await bcrypt.hash(userInput.password, 12)
        // we use bcrypt to hash the password
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPw
        });
        const createdUser = await user.save()
        // the above will return the newly created user object 
        // We also need to return some data, and we 
        // use the data we defined in the schema.js file 

        // we return our createdUser with the spread 
        // operator but also the ._doc, this _doc is 
        // so we only get the data we want otherwise 
        // it'll contain lots of meta data 
        return {...createdUser._doc, _id: createdUser._id.toString()}
    },
    login: async function({ email, password }){
        const user = await User.findOne({email: email})
        if(!user){
          const error = new Error('User not found')
          error.code = 401;
          throw error
        }
       const isEqual = await bcrypt.compare(password, user.password)
        if(!isEqual){
          const error = new Error('Password not correct');
          error.code = 401;
          throw error;
        }
       const token = jwt.sign({
        userId: user._id.toString(),
        email: user.email
       }, 'somesupersecretsecret',
       {expiresIn: '1h'})
       return {token: token, userId: user._id.toString()}
      },
      createPost: async function ({ postInput }, req){
       if(!req.isAuth){
        const error = new Error('Not Authenticated')
        error.code = 401;
        throw error;
      }
        const errors = [];
        if(validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, {min: 5})){
          errors.push({message: 'Invalid Title'} )
        }
        if(validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, {min: 5})){
          errors.push({message: 'Invalid Content Field'} )
        }
        if(errors.length > 0){
          const error = new Error('Invalid Input');
          error.data = errors;
          error.code = 422;
          throw error;
        }

        const user = await User.findById(req.userId);
        if(!user){
          const error = new Error('Invalid user');
          error.code = 401;
          throw error;
        }
        // If we make it inside here, we know we can 
        // create a valid post 
          const post =  new Post({
            title: postInput.title,
            content: postInput.content,
            imageUrl: postInput.imageUrl,
            creator: user
          });
          const createdPost = await post.save();
          // add post to users posts 
          user.posts.push(createdPost)
          await user.save();
          return{
            ...createdPost._doc,
            _id: createdPost._id.toString(),
            createdAt: createdPost.createdAt.toISOString(),
            updatedAt: createdPost.updatedAt.toISOString()
          }
      },
      posts: async function({page}, req){
        if(!req.isAuth){
          const error = new Error('Not Authenticated')
          error.code = 401;
          throw error;
        }
        if(!page){
          page = 1;
        }
        const perPage = 2;
        const totalPosts = await Post.find().countDocuments();
        const posts = await Post.find()
        .sort( {createdAt: -1} )
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate('creator');
        return {
          posts: posts.map(p => {
          return {
             ...p.doc,
             _id: p._id.toString(),
             createdAt: p.createdAt.toISOString(),
             updatedAt: p.updatedAt.toISOString() 
            }
        }),
             totalPosts: totalPosts
            };
      },
      post: async function( { id }, req ){
        if(!req.isAuth){
          const error = new Error('Not Authenticated')
          error.code = 401;
          throw error;
        }
        const post = await Post.findById(id).populate('creator');
        if(!post){
          const error = new Error('No post Found');
          error.code = 404;
          throw error;

        }
        return {
          ...post._doc,
          _id: post._id.toString(),
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString()
        };
      },
      updatePost: async function( {id, postInput}, req ){
        if(!req.isAuth){
          const error = new Error('Not Authenticated')
          error.code = 401;
          throw error;
        }
        const post = await Post.findById(id).populate('creator');
        if(!post){
          const error = new Error('No post Found');
          error.code = 404;
          throw error;
        }
        if(post.creator._id.toString() === req.userId.toString()){
            const error = new Error('Not Authrized');
            error.code = 403;
            throw error;
        }
        
        const errors = [];
        if(validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, {min: 5})){
          errors.push({message: 'Invalid Title'} )
        }
        if(validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, {min: 5})){
          errors.push({message: 'Invalid Content Field'} )
        }
        if(errors.length > 0){
          const error = new Error('Invalid Input');
          error.data = errors;
          error.code = 422;
          throw error;
        }
        post.title = postInput.title;
        post.content = postInput.content;
        if(postInput.imageUrl !== 'undefined'){
          post.imageUrl = postInput.imageUrl
        }
        const updatedPost = await post.save();
        return {
          ...updatedPost._doc,
           _id: updatedPost._id.toString(),
           createdAt: updatedPost.createdAt.toISOString(),
           updatedAt: updatedPost.updatedAt.toISOString()
          }
      },
      deletePost: async function({id}, req){
        if(!req.isAuth){
          const error = new Error('Not Authenticated')
          error.code = 401;
          throw error;
        }
        const post = await Post.findById(id);
        if(!post){
          const error = new Error('No post Found');
          error.code = 404;
          throw error;
        }
        if(post.creator.toString() === req.userId.toString()){
            const error = new Error('Not Authrized');
            error.code = 403;
            throw error;
        }

      }
};