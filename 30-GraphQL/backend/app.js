require('dotenv').config({path: './util/my.env'});
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/messages?retryWrites=true`
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '.jpg')
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' ||
     file.mimetype === 'image/jpg'   || 
     file.mimetype === 'image/jpeg'){
        cb(null, true)
     } else {
        cb(null, false)   
     }

}

app.use(bodyParser.json());

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
    }).single('image'));
 
app.use('/images', express.static(path.join(__dirname, 'images')))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization' );
    next()
})


app.use((error, req, res, next) => {
    console.log(error)
  
    const status = error.statusCode || 500;

    const message = error.message;

    const data = error.data;

    res.status(status).json({message: message, data: data});
})

mongoose.connect(MONGODB_URI)
.then(result => {
   const httpServer = app.listen(8080);
})
.catch(err => console.log(err))
