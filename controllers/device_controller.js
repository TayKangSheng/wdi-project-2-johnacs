let Device = require('../models/device')

let deviceController = {

  list: (req, res) => {
    Device.find({}, (err, output) => {
      if (err) throw err
      res.render('device/index', { devices: output })
    })
  },

  create: (req, res) => {
    let deviceId = req.params.id
    console.log(deviceId);
    res.send(deviceId)


    // let newDevice = new Device({
    //   deviceId: req.body.deviceId,
    //   //john
    // })
    // newDevice.save(function (err, savedEntry) {
    //   if (err) throw err
    //   Device.find({}, (err, devices) => {
    //     if (err) throw err
    //     res.render('device/index', { devices: devices })
    //   })
    // })

  },

  show: (req, res) => {
    Device.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('device/show', { device: output })
    })
  },

  new: (req, res) => {
    res.render('device/create')
  },

  edit: (req, res) => {
    Device.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('device/edit', { device: output })
    })
  },

  update: (req, res) => {
    Device.findOneAndUpdate({
      _id: req.params.id
    }, {
      order: req.body.order
      //john
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
