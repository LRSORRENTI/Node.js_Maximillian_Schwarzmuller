const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error.js')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminData = require('./routes/admin');
// We now need to modify these a bit, since we've 
// added our controller logic 

const adminRoutes = require('./routes/admin.js');

 const shopRoutes = require('./routes/shop.js');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// now we also modify the second argument below from
app.use('/admin', adminRoutes.routes);
// to:
// app.use('/admin', adminRoutes)

app.use(shopRoutes);

// app.use((req, res, next) => {
//   res.status(404).render('404', { pageTitle: 'Page Not Found' });
// });

app.use(errorController.get404)

app.listen(3000);
