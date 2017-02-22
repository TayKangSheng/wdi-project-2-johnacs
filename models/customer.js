const mongoose = require('mongoose')

let customerSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: {type: String, required: true},
  address: String,
  contactNumber: Number
})

customerSchema.virtual('fullName').get(function () {
  return this.fName + ' ' + this.lName
})

let Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
