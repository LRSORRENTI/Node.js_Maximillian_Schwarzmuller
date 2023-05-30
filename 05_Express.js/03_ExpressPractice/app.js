const ExpressJS = require("express");

const app = ExpressJS()

app.use('/', (req, res, next) => {
    res.send("<h1>h1 sent?</h1>")
    console.log("working?")
})

app.listen(3001)