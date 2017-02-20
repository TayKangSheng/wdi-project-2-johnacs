const express = require('express')
const Router = express.Router()
const productController = require('../controllers/product_controller')

Router.get('/', productController.list)

Router.get('/new', productController.new)

Router.get('/:id', productController.show)

Router.get('/:id/edit', productController.edit)

// no create function since order is generated automatically
Router.post('/', productController.create)

Router.put('/:id', productController.update)

Router.delete('/:id', productController.delete)

module.exports = Router
