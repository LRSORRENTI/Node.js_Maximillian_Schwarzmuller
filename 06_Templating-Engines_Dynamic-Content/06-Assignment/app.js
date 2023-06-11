const express = require("express")

const bodyParser = require("body-parser")

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (req, res, next) => {
    res.render('home.ejs', {pageTitle: 'Add user'} )
})

app.get('/users', (req, res, next) => {
    res.render('user.ejs', {pageTitle: 'Users'});
})

app.post('/add-user', (req, res, next) => {
   res.redirect('/users')
})


app.listen(3000)