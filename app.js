require('dotenv').config({silent: false})
const express = require('express')
var path = require('path')
var debug = require('debug')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// all you need for flash data
var session = require('express-session')
var MongoStore = require('connect-mongo')(session) // connect-mongo need session
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var passport = require('passport')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI)

const port = process.env.PORT || 4000

// static files
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))

// passport comes after session
// initialise passport into your application
app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)

app.use(flash())
// so the req.body is populated for delete and PUT request
app.use(methodOverride('_method'))

// to populate req.body
app.use(bodyParser.urlencoded({ extended: true }))

// to us ejs
app.set('view engine', 'ejs')

app.use(ejsLayouts)

app.use(function(req, res, next){
  res.locals.userdata = req.user // comes from passport
  res.locals.authenticated =  req.isAuthenticated()
  next()
})

const Auth = require('./routes/auth_router')
app.use('/', Auth)


app.get('/', (req,res)=>
res.render('index')
)

const order = require('./routes/order_router')
app.use('/order', order)

const product = require('./routes/product_router')
app.use('/product', product)

const device = require('./routes/device_router')
app.use('/device', device)

const customer = require('./routes/customer_router')
app.use('/customer', customer)

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.listen(port, function () {
  console.log('middleware test is running on ' + port)
})
