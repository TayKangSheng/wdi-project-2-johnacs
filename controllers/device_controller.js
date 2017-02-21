let Device = require('../models/device')
let Product = require('../models/product')

let deviceController = {

  list: (req, res, next) => {
    Device.find({})
    .populate('product')
    .exec(
     (err, output) => {
       if (err) next(err)
       res.render('device/', { devices: output })
     })
  },

  new: (req, res) => {
    Product.find({}, function (err, output) {
      if (err) throw err
      res.render('device/new', {
        products: output
      })
    })
  },

  create: (req, res) => {
    let newDevice = new Device({
      deviceId: req.body.deviceId,
      product: req.body.id
    })

    newDevice.save((err,savedEntry)=> {
      if (err) throw err
      res.redirect('/device')
    }
  )

  },

  show: (req, res) => {
    Device.findById(req.params.id)
    .populate('product')
    .exec(
     (err, output) => {
       if (err) throw err
       res.render('device/show', { device: output })
     })
  },

  edit: (req, res) => {
    Product.find({},
      (err, output2) => {
        if (err) throw err

        let productList = output2

        Device.findById(req.params.id)
        .populate('product')
        .exec(
          (err, output) => {
            if (err) throw err
            res.render('device/edit', {
              device: output,
              products: productList
            })
          })
      })
  },

  update: (req, res) => {
    Device.findOneAndUpdate({
      _id: req.params.id
    }, {
      deviceId: req.body.deviceId,
      product: req.body.productId
    }, (err, device) => {
      if (err) throw err
      res.redirect('/device/' + device.id)
    })
  },

  delete: (req, res) => {
    Device.findByIdAndRemove(req.params.id, (err, output) => {
      if (err) throw err
      res.redirect('/device')
    })
  }

}

module.exports = deviceController
