const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHBS = require('express-handlebars');

const app = express();


app.engine('handlebars', expressHBS());
// now when we use handlebars, we need to import it 
// above with the const expressHBS = require function,
// but we also need to use the app.engine and pass in 
// two arguments, 'handlebars', and expressHBS, but we 
// need to invoke it to initialize the engine expressHBS()
app.set('view engine', 'handlebars')
// we also should explicitly name where our views folder 
// is: 
app.set('views', 'views')

// if our views folder was named, templates or anything 
// else it would be: 
// app.set('views', 'templates' )

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: '404 Page Not Found'})
});

app.listen(3000);
