
require('dotenv').config({path: './util/my.env'})

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer')

const errorController = require('./controllers/error');
const User = require('./models/user');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/shop`
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

// we'll add a file storage config object:
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images')
  },
  // we need to pass in null as the first arg
  // each callback, because if it's null it's okay 
  // to store it , if not null it would need an Error

  filename: (req, file, cb) => {
    // and we can concatenate the filename with 
    // the original name to ensure we don't have 
    // identical filenames in our images directory
    // cb(null, file.filename + '-' + file.originalname);
    // the above callback will give us undefined.png 
    // every time, so instead we can generate a unique 
    // name with: 
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilt = (req, file, cb) => {
  // and inside here we can write some logic to 
  // define if we want to accept a certain file 
  // type or not 

  if(file.mimetype === 'image/png' 
  || file.mimetype === 'image/jpg'
  || file.mimetype === 'image/jpeg'){
      // so if true, we'll accept the file
  cb(null, true);
  } else {
  cb(null, false);
  }
};


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
// The above body parser doesn't enable file hamdling 
// as well, we need  a new package, called: multer
// We have to execute multer like a function
app.use(multer({dest: 'images', storage: fileStorage, fileFilter: fileFilt }).single('image'))
// and we chain on the single method for singlefile, 
// then we add the name for the single file, for us 
// it will be image, because in our ejs view:

/* <label for="image">Image</label>
<input 
    type="file" 
    name="image" 
    id="image" >
</div> */

// The file picker name is image

// and with that we initialize multer

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  // throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
