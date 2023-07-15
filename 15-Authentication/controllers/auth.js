const bcrypt = require('bcryptjs')

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('64a1947fb3829883c8589d0e')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  // the above are the three values that should reach 
  // this route
// We also need to check if an email already 
// exists: 
User.findOne({email: email})
// above we're checking if the left side email field, 
// matched what's inside of const email = req.body.email,
// basically does the key match the passed in email, 
// left side is database, right side user input 
.then(userDoc => {
  // then we promise chain to check if user exists,
  // if userDoc is true, that means we have a user
  // with that email already, so the client user 
  // needs to use a different email
  // so if UserDoc return a redirect back to signup
  if(userDoc){
    // should also display a message to the user, 
    // right now we only have it redirecting
   return res.redirect('/signup')
  }
  // Now if we make it here, we've confirmed that 
  // the email input is valid, it doesn't yet exist
  // in our mongoDB atlas, so we can create a new one


  // Now we'll also utilize bcrypt to encrypt our password
  // bcrypt.hash is a method that takes in two arguments, 
  // first we'll pass in our password, second is the 
  // salt value, basically how many rounds of hashing 
  // will be applied, the higher the value the longer it 
  // will take, but the more secure it will be, currently
  // 12-20 is accepted as secure

  // Note though. this is an async function since it 
  // takes time to hash the password, we'll utilize 
  /// promise chaining to resolve
 return bcrypt.hash(password, 12)
})
.then(hashedPassword => {
  const user = new User({
    email: email,
    password: hashedPassword,
    cart: { items: [] }
  })
  // and after updating user model, we can call
  // .save() to save this user
  return user.save();
})
.then(result => {
  // we'll also chain another promise, where we redirect
  res.redirect('/login')
})
.catch(err => console.log(err))
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
