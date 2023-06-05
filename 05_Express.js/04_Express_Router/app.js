// add stuff later 

const app = express();

const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop")

// so our adminRoutes is importing the routes 
// we have in our admin js file

app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes)
// just as before, the order matters, if we put 
// the above line below the app.use('/')
// we would never reach it

app.use(shopRoutes)

app.listen(3000)