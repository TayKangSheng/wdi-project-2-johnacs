const express = require('express')
const Router = express.Router()
const orderController = require('../controllers/order_controller')

Router.get('/', orderController.list)

// Router.get('/new', orderController.new)

Router.get('/:id', orderController.show)

Router.get('/:id/edit', orderController.edit)

Router.post('/', orderController.create)

Router.put('/:id', orderController.update)

Router.delete('/:id', orderController.delete)

module.exports = Router
