let Customer = require('../models/customer')
let Device = require('../models/device')

let customerController = {

  list: (req, res) => {

    Customer.find({},
      (err, output) => {
        if (err) throw err
            res.render('customer/', {
              customers: output
            })
          })
  },

  show: (req, res) => {
    // res.send('show')

    Customer.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('customer/show', { customer: output })
    })
  },

  create: (req, res) => {

    let newCustomer = new Customer({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      address: req.body.address,
      contactNumber: req.body.contact
    })

    newCustomer.save((err, savedEntry)=>{
      if (err) throw err
        res.redirect('customer/')
      })

  },


  new: (req, res) => {

      res.render('customer/new')
  },


  edit: (req, res) => {
    // res.send('edit')

    Customer.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('customer/edit', { customer: output })
    })

  },

  update: (req, res) => {
    Customer.findOneAndUpdate({
      _id: req.params.id
    }, {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      address: req.body.address,
      contactNumber: req.body.contact
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
