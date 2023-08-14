const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {
    // back on the frontend, we'll add a header 
    // inside of Feed.js on the frontend:
    
    
    // fetch('http://localhost:8080/feed/posts?page=' + page, {
    //   headers: {
  
    //     // as a quick note here, back in our backend app.js,
    //     // we enabled 'Authorization' right after 'Content-Type', 
    //     // without that enabled, below will not work 
    
    //     Authorization: 'Bearer ' + this.props.token
   
    //     // we pass in 'Bearer whitespace + the token from 
    //     // the props object
    //     // And Bearer is just the typical naming convention 
    //     // for JWT's 
   
    //   }
    // })

    const authHeader = req.get('Authorization');
        if(!authHeader){
            const error = new Error('Not authenticated')
            error.statusCode = 401;
            throw error;
        }


    // const token = req.get('Authorization').split(' ')[1];
    
      // after adding authHeader we can refactor the 
      // above to: 

      const token = authHeader.split(' ')[1];

    // so above we get the token from the this.props.token, 
    // notice we're splitting on the whitespace, since 
    // that;s what we need 

    // now we need to decode the token, we'll use a 
    // try / catch block 

    let decodedToken;
    try{
        // inside here we call jwt.verify, which will 
        // decode and check that it's valid, we pass 
        // in the token we extracted from the header on 
        // the frontend 

        // and the second arg is the secret we used to sign 
        // the token 
         decodedToken = jwt.verify(token, 'secret-which-should-be-longer')
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        // then we add a check if something went wrong, 
        // if verification was unsuccessful
        const error = new Error('Not authenticated')
        error.statusCode = 401;
        throw error; 
    }
    // finally if we make it past those checks, 
    // we have a valid token now we extract the info 
    // from the token 

    req.userId = decodedToken.userId;
    next();
    // now we can add this middleware to our routes 
}