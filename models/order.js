const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
  deviceId: [{type: mongoose.Schema.Types.ObjectId, ref:'Device'}],
  product: [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
  orderDate: { type: Date, default: Date.now },
  completed: {type:Boolean, default: false}
})

let Order = mongoose.model('Order', orderSchema)

module.exports = Order
