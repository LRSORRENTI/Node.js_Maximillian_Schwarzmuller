exports.getLogin = (req, res, next) => {
       res.render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          isAuthenticated: req.isLoggedIn
        });
  };
  
  

  exports.postLogin = (req, res, next) => {
    
    // We set the header in our response,
    // and we pass in 'Set-Cookie'
    // this 'Set-Cookie' is reserved, it's 
    // a special phrase which... sets a cookie!

    res.setHeader('Set-Cookie', 'loggedIn=true' );

    // and the second arg is the value of the header, 
    // which is a key value pair

    res.redirect('/');
}
// And yes, if we look at the dev tools, 
// and in the application tab, scroll down 
// to cookies, we see our cookie!

// Name: loggedIn
// Value: true
