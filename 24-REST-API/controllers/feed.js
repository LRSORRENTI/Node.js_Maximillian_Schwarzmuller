const fs = require('fs');
const path = require('path')


// We're going to use this controllerfor our feed, 
// a news feed on a news website, or a posts feed on 
// a social media site 

const {validationResult} = require('express-validator/src/validation-result')


const Post = require('../models/post')
// And now we can import the Post model we defined

// Important to note, we won't call res.render anynore,
// since we're not working MVC anymore, there's no 
// views to render 

// REST API's never render views, since they don't return 
// HTML 
exports.getPosts = (req, res, next) => {

    // instead we'll res.json(),, which let's use return 
    // a JSON response object, but we also want to 
    // add the status code before calling res.json():


    // These status codes are very important because 
    // it tells the client to render if 200 ok or 
    // if it's an error code, render an error interface 
    // instead 

    Post.find()
    .then(posts => {
    res.status(200)
    .json({message: "Fetched posts successfully", posts: posts})
    })
    .catch(err => {
        if(!err.statusCode ){
            err.statusCode = 500;
        }
        // we also need to call next(err) otherwise 
        // the error won't reach the next error handling 
        // middleware
        next(err)
    }); 
};

exports.createPost = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors){
        const error = new Error('Validation failed, data entry invalid!!')
        error.statusCode = 422;
        throw error;
        // return res.status(422).json({message: 'Validation failed, data entry invalid!!',
        //                             errors: errors.array()
        }
    
        if(!req.file){
            //  so if the above is not set, we're 
            // missing a file, 
            const error = new Error('No Image Provided');
            error.statusCode = 422;
            throw error;
        }
        // so if we make it past the above check, we have 
        // a valid file
    const imageUrl = req.file.path.replace("\\" ,"/");
    // const imageUrl = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    // create post in db 

    // Here's where we'll use our Post Schema Model: 
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: {
            name: 'Luke'
        },
    })
    post.save()
    .then(result => {console.log(result)
    res.status(201).json({
        // we use code 201 for success AND a resource 
        // was created , just 200 is success only,
        // 201 is both 
        message: 'Post created successfully',
        post: result
        });
    })
    .catch(err => {
        if(!err.statusCode ){
            err.statusCode = 500
        }
        // we also need to call next(err) otherwise 
        // the error won't reach the next error handling 
        // middleware
        next(err)
        // console.log('error line 68 feedjs controller', err)
    });
};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    // important to note .params.postId must match 
    // the name given in the routes after the colon:

    // /routes/feed.js: 

    // router.get('/post/:postid')

    // Now we need to find a post with 
    // that unique id in the database, now we 
    // use the post.js model and the findById method 
    // we defined in there: 

    Post.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Post with that id not found')
            error.statusCode = 404;
            throw error;
            // we learned we should use next in here,
            // but if we throw an error inside of a 
            // then block, the below catch block 
            // will be reached and grab that error, we throw 
            // the error down to the catch block peyton manning
        }

        // if we make it here it means we did find the 
        /// post: 

        res.status(200).json({
            message: 'Post Found!', post: post
        });
    })
    .catch(err => {
        if(!err.statusCode ){
            err.statusCode = 500
        }
        next(err)
    });
}; 

exports.updatePost = (req, res, next ) => {
    const postId = req.params.postId;
    const errors = validationResult(req);
    if(!errors){
        const error = new Error('Validation failed, data entry invalid!!')
        error.statusCode = 422;
        throw error;
        // return res.status(422).json({message: 'Validation failed, data entry invalid!!',
        //                             errors: errors.array()
        }
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;

    // but if the image url isn't just text in 
    // the request body, but a file instead,
    // we need to handle that scenario:

    if(req.file){
        imageUrl = req.file.path;
    }
    // So here if imageUrl IS NOT set, because 
    //    let imageUrl = req.body.imageUrl; wasn't 
    // able to be extracted, and we didn't make it 
    // into the conditonal check if(req.file) then 
    // we need to throw an error:

    if(!imageUrl){
        const error = new Error('No File Selected')
        error.statusCode = 422;
        throw error;
    }
    Post.findById(postId)
    .then(post => {
        // if post is undefined, if we don't fimd one
        if(!post){
            const error = new Error('Post with that id not found')
            error.statusCode = 404;
            throw error;
        }
        if(imageUrl !== post.imageUrl){
            // so if we make it in here, we call 
            // the function we defined below: 
            clearImage(post.imageUrl);
        }
        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        // so if we make it in here, we set the 
        // post.title content and imageURl to the updated 
        // versions, and call save, which retains the old 
        // post id but updates the content 
        return post.save();
    })
    .then(result => {
        res.status(200).json({message: 'Post Updated!', post: result});
    })
    .catch(err => {
        if(!err.statusCode ){
            err.statusCode = 500
        }
        // we also need to call next(err) otherwise 
        // the error won't reach the next error handling 
        // middleware
        next(err)
        // console.log('error line 68 feedjs controller', err)
    });

}

exports.deletePost = (req, res, next ) => {
    // in here we need the postId again
    const postId = req.params.postId;
    // then we find a post with that id
    Post.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Post with that id not found')
            error.statusCode = 404;
            throw error;
        }
        // if user is logged in 
        clearImage(post.imageUrl)
        return Post.findByIdAndRemove(postId)
        .then(result => {
            console.log(result)
            res.status(200).json({message: 'Post Deleted'})
        })
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    })
    
    
 }


const clearImage = (filepath) => {
    // below we construct the file path by joining
    // the directory name, then .. up one folder to 
    // root dir, since /images is in rootdir,
    
    filepath = path.join(__dirname, '..', filepath);

    // then we use the unlink to ddelete the file by 
    // passing the file path to it 

    fs.unlink(filepath, (error) => {
        console.log(error)
    })
    // And we want this clearImage function to fire 
    // whenver an image is updated 
}