const mongoose = require('mongoose')

let customerSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  address: String,
  contactNumber: Number,
  deviceId: [{type: mongoose.Schema.Types.ObjectId, ref:'Device'}]
})

let Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
