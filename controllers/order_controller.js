let Order = require('../models/order')
let Device = require('../models/device')
let Customer = require('../models/customer')

let orderController = {

  list: (req, res) => {
    Order.find({})
      .populate('deviceId')
      .populate('productId')
      .populate('customerId')
      .exec(
        (err, output) => {
          if (err) next(err)
          res.render('order/', {
            orders: output,
            flash: req.flash('flash')[0]
          })
        })
  },

  completed: (req, res) => {
    Order.find({
        completed: true
      })
      .populate('deviceId')
      .populate('productId')
      .populate('customerId')
      .exec(
        (err, output) => {
          if (err) next(err)
          res.render('order/', {
            orders: output,
            flash: req.flash('flash')[0]
          })
        })
  },

  inprocess: (req, res) => {
    Order.find({
        completed: false
      })
      .populate('deviceId')
      .populate('productId')
      .populate('customerId')
      .exec(
        (err, output) => {
          if (err) next(err)
          res.render('order/', {
            orders: output,
            flash: req.flash('flash')[0]
          })
        })
  },

  cancelled: (req, res) => {
    Order.find({
        cancelOrder: true
      })
      .populate('deviceId')
      .populate('productId')
      .populate('customerId')
      .exec(
        (err, output) => {
          if (err) next(err)
          res.render('order/', {
            orders: output,
            flash: req.flash('flash')[0]
          })
        })
  },

  create: (req, res) => {
    Device.find({
      deviceId: req.body.deviceId
    }, (err, output) => {
      // console.log(output);

      let deviceId = output[0]._id
      let customer_Id = output[0].customerId[0]
      let product_Id = output[0].productId[0]

      let newOrder = new Order({
        deviceId: deviceId,
        productId: product_Id,
        customerId: customer_Id
      })
      newOrder.save(function(err, savedEntry) {
        if (err) throw err
        res.send('order taken')
      })
    })
  },

  show: (req, res) => {
    // console.log('show order');
    // res.send('show order')

    Order.findById(req.params.id)
      .populate('deviceId')
      .populate('productId')
      .populate('customerId')
      .exec(
        (err, output) => {
          if (err) next(err)
          res.render('order/show', {
            order: output,
            flash: req.flash('flash')[0]
          })
        })

  },

  edit: (req, res) => {

    Order.findById(req.params.id)
      .populate('deviceId')
      .populate('productId')
      .populate('customerId')
      .exec(
        (err, output) => {
          if (err) next(err)
          res.render('order/edit', {
            order: output,
            flash: req.flash('flash')[0]
          })
        })

  },

  update: (req, res) => {
    Order.findOneAndUpdate({
      _id: req.params.id
    }, {
      completed: req.body.completed,
      cancelOrder: req.body.cancelOrder
    }, (err, orderItem) => {
      if (err) throw err
      res.redirect('/order/' + orderItem.id)
    })
  },

  delete: (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, orderItem) => {
      if (err) throw err
      res.redirect('/order')
    })
  }

}

module.exports = orderController
