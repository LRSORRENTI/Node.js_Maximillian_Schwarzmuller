const express = require("express")

const bodyParser = require("body-parser")

const app = express()

const users = [];

app.set('view engine', 'ejs')
app.set('views', 'views')

// app.use(bodyParser({extended: false}))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.render('home.ejs', {pageTitle: 'Add user'} )
})

app.get('/users', (req, res, next) => {
    res.render('user.ejs', {pageTitle: 'Users', myUsers: users});
})

app.post('/add-user', (req, res, next) => {
    users.push({name: req.body.username});
   res.redirect('/users')
})

app.use((req, res, next) => {
    res.status(404).render('404Error.ejs', { pageTitle: 'Page Not Found' });
  });
  

app.listen(3000)