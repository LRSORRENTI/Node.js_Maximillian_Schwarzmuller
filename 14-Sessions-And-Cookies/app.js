const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
// add the new session store below
// const MongoDBStore = require('connect-mongodb-session')(session);
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const login = require('dotenv').config({path:'C:/Users/lrsor/Desktop/Programming/MAX-NODE/NODE-JS_MAX/14-Sessions-And-Cookies/util/my.env'});
require('dotenv').config({ path: '/util/my.env' });
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/shop`
console.log(login, MONGODB_URI, ':success?')
// Let's also store the connection string from below 
// inside of a variable for easier use 

// const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/shop?retryWrites=true&w=majority`
// As a note the above was not working, need to remove retryWrites:

const app = express();
// now initialize the store: 
const store = new MongoDBStore({
  url: MONGODB_URI,
  collection: 'sessions'
})


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Below is where we'll register our session, inside 
// we pass in a JS object where we configure the 
// session setup, we first set up a secret key, which 
// in production should be a long string of chars and 
// nums but for learning purposes we'll keep it simple

// Also set the resave key to false, meaning the session 
// won't save on every request / response, it will only 
// save if something changed in the session

// also pass in the saveUnitialized set to false, 
// which ensures no session gets saved for a req 
// where it doesn't need to be

app.use(session({secret: 'my secret',
                resave: false,
                saveUninitialized: false,
                store: store
              }))

app.use((req, res, next) => {
  User.findById('64a1947fb3829883c8589d0e')
    .then(user => {
      req.user = user;
      // req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
// So we don't pass in a filter like we did with 
// 'admin' because anything not found in shopRoutes
// will auto go inside of authRoutes to find it
app.use(authRoutes);

app.use(errorController.get404);

// mongoose
//   .connect(
//     'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/test?retryWrites=true'
//   )
//   .then(result => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
// const mongoConnect = (callback) => {
  // MongoClient.connect(`mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/?retryWrites=true&w=majority`)
//   const login = require('dotenv').config({path:'C:/Users/lrsor/Desktop/Programming/MAX-NODE/NODE-JS_MAX/12-NoSQL-MongoDB/util/my.env'});
// require('dotenv').config({ path: '/util/my.env' });
// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;

  // console.log(login, 'success?')
// OKAY AS A NOTE HERE, THE CONFIG PATH IS WORKING WITH 
// THE ACTUAL PATH WHEN  path: '/my.env' or path:'./my.env' no 
// success 
  mongoose.connect(MONGODB_URI)
  .then(result => {
    User.findOne().then(user => {
      // so if user is not set !user
      if(!user){
        const user = new User({
          name: 'Luke', 
          email: 'email@myNewEmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  // .then(client => { 
  // console.log(client, 'Successful Connection');
  // callback(client);
  // callback();
  //instead of calling client in the callback
  // we'll use a variable
  // })
  // .catch(err => {
  //     console.log(err)
  //     throw err;
  // });
})
.catch(err => {
  console.log(err)
})
  // the connect method also returns a promise, which 
  // we want to log, if we do get an error somewhere 
  // };