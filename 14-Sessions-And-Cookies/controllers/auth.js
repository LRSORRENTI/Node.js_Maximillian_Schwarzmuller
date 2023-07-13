const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  // console.log(req.get('Cookie'));
  // Now that below we added our cookie, let's 
  // log it to the console and see what we get, 
  // remember, in the network tab it's set under
  // 'Cookie' so that's the req.get('Cookie') value
  // which we see is loggedIn=true

  // When we actually extract the value below, 
  // we'll utilize some string methods to 
  // get the value we need so instead of 

  // const isLoggedIn = req.get('Cookie')

  // We'll instead trim and split so we just get
  // our boolean value true:

//   const isLoggedIn = req 
//         .get('Cookie')
//         .split(';')[2]
//         .trim()
//         .split('=')[1];
// console.log(isLoggedIn) // true
console.log(req.session.isLoggedIn)
       res.render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          // isAuthenticated: req.isLoggedIn
          // now we can just pass in the value 
          // below since we trimmed it
          isAuthenticated: false
          // Now if we reload the page we see 
          // our two options in the navbar are back!
          // we now have add product and Admin products
        });
  };
  
  

  // exports.postLogin = (req, res, next) => {

    // We set the header in our response,
    // and we pass in 'Set-Cookie'
    // this 'Set-Cookie' is reserved, it's 
    // a special phrase which... sets a cookie!

    // res.setHeader('Set-Cookie', 'loggedIn=true' );

    // and the second arg is the value of the header, 
    // which is a key value pair

//     res.redirect('/');
// }
// And yes, if we look at the dev tools, 
// and in the application tab, scroll down 
// to cookies, we see our cookie!

// Name: loggedIn
// Value: true

// And now that our cookie is set, the browser 
// sends it to the server for every request that's 
// now made 

// and now let's click on the products link, 
// which takes us to the product page, then 
// look at the network tab, we see the 200 ok 
// GET request, and if we scroll down to request 
// headers, we see our cookie!! loggedIn=true

// Now let's use the session package instead

exports.postLogin = (req, res, next) => {
  User.findById('64a1947fb3829883c8589d0e')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    res.redirect('/')
  })
.catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
  // inside here is where we'll clear out 
  // our session
  req.session.destroy((err) => {
    console.log(err)
    res.redirect('/')
  });
  // we can call a method called destroy, a method 
  // offered by the package we're using

}