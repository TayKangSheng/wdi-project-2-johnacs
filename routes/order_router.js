const express = require('express')
const Router = express.Router()
const orderController = require('../controllers/order_controller')

Router.get('/', orderController.list)

Router.get('/:id', orderController.show)

Router.post('/device', orderController.create)



// Router.get('/new', orderController.new)
//
// Router.get('/:id/edit', orderController.edit)
//
//
// Router.put('/:id', orderController.update)
//
// Router.delete('/:id', orderController.delete)

module.exports = Router
