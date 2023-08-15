require('dotenv').config({path: './util/my.env'});

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const { v4: uuidv4 } = require('uuid');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/messages?retryWrites=true`

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// mongoose
//   .connect(
//     'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/messages?retryWrites=true'
//   )
//   .then(result => {
//     app.listen(8080);
//   })
//   .catch(err => console.log(err));

  mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(8080);
})
.catch(err => console.log(err))


// require('dotenv').config({path: './util/my.env'});
// const mongoose = require('mongoose');
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;

// const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/messages?retryWrites=true`

// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');

// const feedRoutes = require('./routes/feed');
// const authRoutes = require('./routes/auth');

// const app = express();

// const fileStorage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function(req, file, cb) {
//         cb(null, uuidv4() + '.jpg')
//         // cb(null, new Date().toISOString() + '-' + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/png' ||
//      file.mimetype === 'image/jpg'   || 
//      file.mimetype === 'image/jpeg'){
//         // so if the above is true, it's valid, 
//         // we only want png, jpg, or jpeg
//         // we then call cb, null being no error, 
//         // absence of a value aka an absemce of an error, 
//         // and true, file is valid 
//         cb(null, true)
//      } else {
//         cb(null, false) // if the file is invalid, 
//         // we still return no error, null, but we return 
//         // false
//      }

// }

// // here we'll set up the middleware to serve images 
// // statically, and we'll bring in the path module, 
// // then use path.join to construct an absolute path
// // And we pass in __dirname which gives us the path 
// // to the directory, and on the same level as app.js
// // we have /images 




// app.use(bodyParser.json());
// // now we use bodyParser.json, since we're working 
// // with JSON, we expect JSON, earlier in the course 
// // we used bodyParser.urlencoded, not anymore 

// app.use(multer({
//     storage: fileStorage,
//     fileFilter: fileFilter
//     }).single('image'));

// // Above we register multer as a function, and we 
// // pass in a object to configure, then pass in storage 
// // and fileFilter and .single to specify to multer 
// // we accept a single file called image in the incoming 
// // request 


// app.use('/images', express.static(path.join(__dirname, 'images')))
// // Now with the above, the requests going to /images 
// // will be handled 

// app.use((req, res, next) => {
//     // These headers are set to allow CORS to be used, the 
//     // '*' is a wildcard, meaning anything is allowed, or 
//     // we can pass in specified values, for the first we couldv've 
//     // passed in : 
    
//     // res.setHeader('Access-Control-Allow-Origin', 'codepen.io');

//     // if we wanted to to only allow codepen.io, or lock 
//     // it to any specific domain

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // We could pass in codepen.io above if we wanted 
//     // to just allow codepen, but we use * for all instead 
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     // We can also modify which methods to allow, we could ,
//     // only allow GET or POST, whatever we need 
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization' );
//     next()
// })


// app.use('/feed', feedRoutes);
// // so any request that starts with /feed will be 
// // forwarded to the feedRoutes, into routes/feed.js
// // where we handle one request for now '/posts' 

// app.use('/auth', authRoutes)


// app.use((error, req, res, next) => {
//     console.log(error)
//     // this will execute whenever next 
//     // calls the error from the middleware 
//     const status = error.statusCode || 500;
//     // if the above is undefined on the left, 
//     // it'll default to 500
//     const message = error.message;

//     const data = error.data;

//     res.status(status).json({message: message, data: data});
// })

// mongoose.connect(MONGODB_URI)
// .then(result => {
//     app.listen(8080);
// })
// .catch(err => console.log(err))
