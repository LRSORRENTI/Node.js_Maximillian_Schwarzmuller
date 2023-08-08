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

    res.status(200).json({
        posts: [
         {
            _id: '1' ,
            title: 'First Post',
            content: "this is my first post",
            imageUrl: 'images/TODO-PROJ-COPY.jpg',
            creator: {
                name: 'Luke',
                  },
                  createdAt: new Date()
                }
        ]
    })
}

exports.createPost = (req, res, next) => {

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
    // create post in db 

    // Here's where we'll use our Post Schema Model: 
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/TODO-PROJ-COPY.jpg',
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
