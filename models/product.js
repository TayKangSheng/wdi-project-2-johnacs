const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  title: String,
  description: { type: String, default: 'default description' }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product
