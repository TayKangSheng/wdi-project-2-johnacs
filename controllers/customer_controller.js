let Customer = require('../models/customer')

let customerController = {

  list: (req, res) => {
    Customer.find({}, (err, customers) => {
      if (err) throw err
      res.render('customer/index', { customers: customers })
    })
  },

  create: (req, res) => {
    // let deviceId = req.params.id
    // console.log(deviceId);
    // res.send(deviceId)


    let newCustomer = new Customer({
      deviceId: req.body.deviceId,
      // john
    })
    newCustomer.save(function (err, savedEntry) {
      if (err) throw err
      Customer.find({}, (err, customers) => {
        if (err) throw err
        res.render('order/index', { customers: customers })
      })
    })

  },

  show: (req, res) => {
    Customer.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('customer/show', { customer: output })
    })
  },

  new: (req, res) => {
    res.render('customer/create')
  },

  edit: (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
      if (err) throw err
      res.render('customer/edit', { customer: customer })
    })
  },

  update: (req, res) => {
    Customer.findOneAndUpdate({
      _id: req.params.id
    }, {
      fName: req.body.fName,
      lName: req.body.lName,
      address: req.body.address,
      contactNumber: req.body.contactNumber
    }, (err, customer) => {
      if (err) throw err
      res.redirect('/customer/' + customer.id)
    })
  },

  delete: (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, output) => {
      if (err) throw err
      res.redirect('/customer')
    })
  }

}

module.exports = customerController
