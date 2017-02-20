const express = require('express')
const Router = express.Router()
const customerController = require('../controllers/customer_controller')

Router.get('/', customerController.list)

Router.get('/new', customerController.new)

Router.get('/:id', customerController.show)

Router.get('/:id/edit', customerController.edit)

Router.post('/device', customerController.create)

Router.put('/:id', customerController.update)

Router.delete('/:id', customerController.delete)

module.exports = Router
