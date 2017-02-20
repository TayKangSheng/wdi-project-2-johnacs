const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
  deviceId: String,
  description: { type: String, default: 'order description' },
  completed: Boolean
})

let Order = mongoose.model('Order', orderSchema)

module.exports = Order
