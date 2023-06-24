const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const db = require('./util/database')


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products').then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// });
// we now get back promises when using execute, 
// this is from the module.exports = pool.promise()
// line in database.js

// PRomises have two methods, .then() and .catch()

// And if we start up the server now, npm start we 
// see the item we added in MySQL logged to 
// the console: 

// [
//     [
//       {
//         id: 1,
//         title: 'Summa Theologica',
//         price: 19.99,
//         description: 'Thomas Aquinas',
//         imageURL: 'https://images.unsplash.com/photo-1654157925394-4b7809721149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80'
//       }
//     ]
// There's also a huge logging of meta data, the above is 
// equivalent to logging result[0]
// The data we get back has the format of an array, 
// with a nested array, and since it's an array 
// we can access specific indexes, like: 

 // result[0] or result[1]

//  db.execute('SELECT * FROM products').then((result) => {
//     console.log(result[0])
// }).catch((err) => {
//     console.log(err)
// });

// result[0]:
// [
//   {
//     id: 1,
//     title: 'Summa Theologica',
//     price: 19.99,
//     description: 'Thomas Aquinas',
//     imageURL: 'https://images.unsplash.com/photo-1654157925394-4b7809721149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80'
//   }
// ]


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
