// add stuff later 


const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop")

// so our adminRoutes is importing the routes 
// we have in our admin js file

app.use(bodyParser.urlencoded({extended: false}));

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
     res.status(404).send('<h1>ERROR:404 Page Not Found</h1>')
     
})
// WE can chain these method calls together in 
// the res if we want

app.listen(3000)