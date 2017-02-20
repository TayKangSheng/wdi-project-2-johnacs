let Order = require('../models/order')

let orderController = {

  list: (req, res) => {
    Order.find({}, (err, output) => {
      if (err) throw err
      res.render('order/index', { orders: output })
    })
  },

  // new: (req, res) => {
  //   res.render('order/create')
  // },

  create: (req, res) => {
    let newOrder = new Order({
      title: req.body.title,
      description: req.body.description
    })
    newOrder.save(function (err, savedEntry) {
      if (err) throw err
      res.redirect('/order')
    })
  },

  show: (req, res) => {
    // console.log('show order');
    // res.send('show order')
    Order.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('order/show', { order: output })
    })
  },


  edit: (req, res) => {
    Order.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('order/edit', { order: output })
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

module.exports = orderController