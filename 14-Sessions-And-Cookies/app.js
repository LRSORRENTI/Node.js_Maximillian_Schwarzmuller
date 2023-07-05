const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const login = require('dotenv').config({path:'C:/Users/lrsor/Desktop/Programming/MAX-NODE/NODE-JS_MAX/12-NoSQL-MongoDB/util/my.env'});
require('dotenv').config({ path: '/util/my.env' });
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

  console.log(login, 'success?')
// OKAY AS A NOTE HERE, THE CONFIG PATH IS WORKING WITH 
// THE ACTUAL PATH WHEN  path: '/my.env' or path:'./my.env' no 
// success 
  mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/shop?retryWrites=true&w=majority`)
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
  })
  .catch(err => {
    console.log(err)
  })