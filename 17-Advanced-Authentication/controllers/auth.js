require('dotenv').config({path: './util/my.env'})

const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const sendGridAPI = process.env.SEND_GRID_API;

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID_API)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendGridAPI
    }
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash(
          'error',
          'E-Mail exists already, please pick a different one.'
        );
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'shop@node-complete.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};


exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  })
}

exports.postReset = (req, res, next) => {
  // this action will be triggered once the reset 
  // button is clicked 

  // and we'll use the randomBytes method which is 
  // a callback function, first arg is 32 for 32 bytes
  // second arg is our callback
  crypto.randomBytes(32, (err, buffer) => {
    if(err){
      console.log(`Error from randomBytes 151: ${err}`);
          return  res.redirect('/reset')
    }
    // so if we make it in here, we've got a valid buffer 
    const token = buffer.toString('hex')
    // we also pass in hex to the toString method, 
    // this argument is necessary for toString to 
    // convert hex to normal ASCII characters 

    // And if we're good, this token should be added to 
    // the user object, and we can use this token to 
    // verify and authenticate 
    User.findOne({email: req.body.email})
    .then(user => {
      if(!user){
        req.flash('error', 'Invalid email' );
        return res.redirect('/reset')
      }
      // if we make it past the above, we know 
      // that it's a valid email that exists in our 
      // database
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      // so above we use three million, six hundred thousand 
      // milliseconds, or One Hour. 60 minutes 
      return user.save()
    })
    .then(result => {
      res.redirect('/');
      const msg = {
        to: req.body.email, // Change to your recipient
        from: 'shop@node-complete.com', // Change to your verified sender
        subject: 'Reset Password',
        text: 'and easy to do anywhere, even with Node.js',
        html: `
        //     <p>You requested a password reset</p>
        //     <p>Click this link <a href="/localhost:3000/reset/${token}"></a>to create a new password</p>
        //   `
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
      
      //  transporter.sendMail({
      //   to: req.body.email,
      //   from: 'shop@node-complete.com',
      //   subject: 'Reset Password',
      //   html: `
      //     <p>You requested a password reset</p>
      //     <p>Click this link <a href="/localhost:3000/reset/${token}"></a>to create a new password</p>
      //   `
      // });
    })
    .catch(err => {
      console.log(err)
    })
  } )
}


exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
  // note that the gt syntax is for checking greater than
  .then(user => {
    let message = req.flash('error');
    if(message.length > 0){
      message = message[0];
    } else{
      message = null;
    }
    res.render('auth/new-password'), {
      path: '/new-password',
      pageTitle: 'New Password',
      errorMessage: message,
      userId: user._id.toString(),
      passwordToken: token
    }
  })
  .catch((err) => console.log(err))
  // above we check if the token is valid, and we use the special 
  // $gt or greater than check to see if it's expired
  // let message = req.flash('error');
  // if(message.length > 0){
  //   message = message[0];
  // } else{
  //   message = null;
  // }
  // res.render('auth/new-password'), {
  //   path: '/new-password',
  //   pageTitle: 'New Password',
  //   errorMessage: message
  // }
} 

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  // and the req.body.password is because in the 
  // view we have: 

  //<input type="password" name="password" id="password">
  const userId = req.body.userId;
  // we also need to add the token so back in the view 
  // we need to add another field
  const passwordToken = req.body.passwordToken;

  let resetUser;

  User.findOne({
    resetToken: passwordToken, 
    resetTokenExpiration: {$gt: Date.now()},
    _id: userId
  })
  .then(user => {
    // inside here is where we'll hash the new 
    // password 
    resetUser = user;
   return bcrypt.hash(newPassword, 12)
    // we pass in newPassword and 12 salting rounds
  })
  .then(hashedPassword => {
    resetUser.password = hashedPassword;
    resetUser.resetToken = undefined;
    resetUser.resetTokenExpiration = undefined;
    /*
    These lines remove the resetToken
     and resetTokenExpiration fields
      from the resetUser document,
       as they are no longer needed 
       after the password has been reset.

resetUser.save(); : This line saves the 
updated resetUser document back to the database.
    */
    resetUser.save();
  })
  .catch(err => {
    console.log(err)
  })
  

}