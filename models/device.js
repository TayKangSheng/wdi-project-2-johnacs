const mongoose = require('mongoose')

let deviceSchema = new mongoose.Schema({
  deviceId: String,
  product: [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}]
})

let Device = mongoose.model('Device', deviceSchema)

module.exports = Device
