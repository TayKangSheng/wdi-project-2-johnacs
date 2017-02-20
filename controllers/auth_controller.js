let Order = require('../models/user')

let authController = {

  list: (req, res) => {
    Order.find({}, (err, orders) => {
      if (err) throw err
      res.render('order/index', { orders: orders })
    })
  },

  create: (req, res) => {
    // let deviceId = req.params.id
    // console.log(deviceId);
    // res.send(deviceId)


    let newOrder = new Order({
      deviceId: req.body.deviceId,
      // description: req.description,
      completed: false
    })
    newOrder.save(function (err, savedEntry) {
      if (err) throw err
      Order.find({}, (err, orders) => {
        if (err) throw err
        res.render('order/index', { orders: orders })
      })
    })

  },

  show: (req, res) => {
    Order.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('order/show', { orderItem: output })
    })
  },

  new: (req, res) => {
    res.render('order/create')
  },

  edit: (req, res) => {
    Order.findById(req.params.id, (err, orderItem) => {
      if (err) throw err
      res.render('order/edit', { orderItem: orderItem })
    })
  },

  update: (req, res) => {
    Order.findOneAndUpdate({
      _id: req.params.id
    }, {
      order: req.body.order,
      description: req.body.description,
      completed: req.body.completed
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

module.exports = authController
