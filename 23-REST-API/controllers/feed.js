// We're going to use this controllerfor our feed, 
// a news feed on a news website, or a posts feed on 
// a social media site 




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
            title: 'First Post',
            content: "this is my first post"
                }
        ]
    })
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // create post in db 
    
    res.status(201).json({
        // we use code 201 for success AND a resource 
        // was created , just 200 is success only,
        // 201 is both 
        message: 'Post created successfully',
        post: {
            id: new Date().toISOString(), 
            title: title,
            content: content
        }
    })
}