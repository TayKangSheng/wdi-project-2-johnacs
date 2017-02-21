let Customer = require('../models/customer')
let Device = require('../models/device')

let customerController = {

  list: (req, res) => {

    Device.find({},
      (err, output2) => {
        if (err) throw err

        let deviceList = output2

        Customer.find({})
        .populate('deviceId')
        .exec(
          (err, output) => {
            if (err) throw err
            res.render('customer/', {
              customers: output,
              devices: deviceList
            })
          })
      })

  },

  create: (req, res) => {
    // let deviceId = req.params.id
    // console.log(deviceId);
    // res.send(deviceId)

    let newCustomer = new Customer({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      address: req.body.address,
      contactNumber: req.body.contact,
      deviceId: req.body.deviceId
    })
    newCustomer.save((err, savedEntry)=>{
      if (err) throw err
      Customer.find({}, (err, customers) => {
        if (err) throw err
        res.redirect('customer/')
      })
    })

  },

  show: (req, res) => {

    Device.find({},
      (err, output2) => {
        if (err) throw err

        let deviceList = output2

        Customer.findById(req.params.id)
        .populate('deviceId')
        .exec(
          (err, output) => {
            if (err) throw err
            res.render('customer/show', {
              customer: output,
              customerDevices: output.deviceId,
              devices: deviceList
            })
          })
      })

  },

  new: (req, res) => {
    Device.find({}, function (err, output) {
      if (err) throw err
      res.render('customer/new', {
        devices: output
      })
    })
  },

  edit: (req, res) => {
    Device.find({},
      (err, output2) => {
        if (err) throw err

        let deviceList = output2

        Customer.findById(req.params.id)
        .populate('deviceId')
        .exec(
          (err, output) => {
            if (err) throw err
            res.render('customer/edit', {
              customer: output,
              devices: deviceList
            })
          })
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
