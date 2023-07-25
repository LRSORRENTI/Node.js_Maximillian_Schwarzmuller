// add stuff later 


const express = require("express");

const bodyParser = require("body-parser");

const path = require('path')

const app = express();

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop")

// so our adminRoutes is importing the routes 
// we have in our admin js file

app.use(bodyParser.urlencoded({extended: false}));

// how we're going to serve our CSS files below:
// we use express object and the static method, 
// then pass in path.join where we want to 
// grant read access, not read / write, just read

// AN IMPORTANT THING TO NOTE: INSIDE THE shop.html 
// file, change:  <link rel="stylesheet" href="../public/css/main.css" />
// to:     <link rel="stylesheet" href="/css/main.css" />
// because we need to act like we're in the public 
// folder already, this is what express will do, 
// express will forward everything to the public 
// folder, therefore in the html files, we need 
// to set the css links as if we already are in 
// the public folder 
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
// just as before, the order matters, if we put 
// the above line below the app.use('/')
// we would never reach it

app.use(shopRoutes)
// Also note if we were to change the order 
// of these app.use(adminRoutes), the adminRoutes 
// would never be reached, the order in which we pass 
// in the routes matters

/*

=====================
ADDING 404 ERROR PAGE
=====================

To include an error page for our shop, 
at the bottom we add a catch-all middleware



*/
app.use((req, res, next) => {
     res.status(404).sendFile(path.join(__dirname, './', 'views', 'error.html'));
     
})
// WE can chain these method calls together in 
// the res if we want

app.listen(3001)