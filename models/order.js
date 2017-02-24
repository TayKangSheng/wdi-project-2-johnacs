const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
  deviceId: [{type: mongoose.Schema.Types.ObjectId, ref:'Device'}],
  productId: [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
  customerId: [{type: mongoose.Schema.Types.ObjectId, ref:'Customer'}],
  orderDate: { type: Date, default: Date.now },
  completed: {type:Boolean, default: false},
  cancelOrder: {type:Boolean, default: false},
})

let Order = mongoose.model('Order', orderSchema)

module.exports = Order
