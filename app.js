const express = require('express')
const app = express()
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// mongoose connection part
// mongoose.connect('mongodb://john:myyenny@ds147799.mlab.com:47799/wdi')
mongoose.connect('mongodb://localhost/pronto')
mongoose.Promise = global.Promise

const port = process.env.PORT || 4000

// static files
app.use(express.static(path.join(__dirname, 'public')))

// so the req.body is populated for delete and PUT request
app.use(methodOverride('_method'))

// to populate req.body
app.use(bodyParser.urlencoded({ extended: true }))

// to us ejs
app.set('view engine', 'ejs')

app.use(ejsLayouts)

app.get('/', (req,res)=>
res.render('index')
)

const order = require('./routes/order_router')
app.use('/order', order)

const product = require('./routes/product_router')
app.use('/product', product)

const device = require('./routes/device_router')
app.use('/device', device)


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
