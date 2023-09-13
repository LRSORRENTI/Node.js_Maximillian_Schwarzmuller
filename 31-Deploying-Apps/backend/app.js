require('dotenv').config({path: './util/my.env'});
const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/messages?retryWrites=true`
const express = require('express');
const bodyParser = require('body-parser');
//  const graphqlHTTP  = require('./graphql/graphHTTP');
const graphqlHTTP  = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const { clearImage } = require('./util/file');
const helmet = require('helmet');
const compression = require('compression');


const auth = require('./middleware/auth');

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

app.use(helmet());
app.use(compression())

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
   
    if(req.method === "OPTIONS"){
        return res.sendStatus(200)
    }

    next()
})


app.use(auth);

// Below we'll add a app.put for sending images 

app.put('/post-image', (req, res, next ) => {
    if(!req.isAuth){
        throw new Error('Not Authenticated! ')
    }
    if(!req.file){
        return res.status(200).json({message: 'No File Provided' })
    }
    if(req.body.oldPath){
        // if an old path was passed with the incoming 
        // request, then clear the old image 
        clearImage(req.body.oldPath);
    }
    // So when we make it inside here, we know we 
    // have successfully grabbed a new image, then 
    // cleared out the old image 
    return res.statusCode(201).json({
        message: 'File Stored',
        filePath: req.file.path
        })
})


// Below we'll add another middleware for graphql
app.use('/graphql', graphqlHTTP({
    // inside this we need to pass in the graphqlHttp 
    // from the graphql package, and we also require 
    // the schema and resolver from each of those files 

    schema: graphqlSchema,
    rootValue: graphqlResolver,
    // we also want to pass in graphiql to true, 
    // this is a special tool, when set to true, 
    // and the server is running, go to 
    // http://localhost:8080/graphql and you'll see 
    // a special way to play around with your graphql
    // api 
    graphiql: true,
    formatError(err){
        // if we just return err, we maintain 
        // the same format as the default
        // return err
        // But we can check if in the error we 
        // don't have the original error
        if(!err.originalError) {
            return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occured';
        const code = err.originalError.code || 500;
        return {
            messgae: message, 
            status: code,
            data: data
        }
    }
    // On that page in the browser: 
    // mutation{
    //     createUser(userInput:{email: "test@test.com",name:"Luke",  password:"tester"}){
    //       _id
    //       email
    //     }
    //   } 

    // This returns:

    // {
    //     "data": {
    //       "createUser": {
    //         "_id": "64f49ea6d04e3f4cc897e905",
    //         "email": "test@test.com"
    //       }
    //     }
    //   }

    // AND if we now check mongoDB, we see that user 
 }));


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

// const clearImage = filePath => {
//     filePath = path.join(__dirname, '..', filePath);
//     fs.unlink(filePath, err => console.log(err));
//   };
  