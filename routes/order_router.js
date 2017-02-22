const express = require('express')
const Router = express.Router()
const orderController = require('../controllers/order_controller')

let isNotLoggedIn = require('./isnotloggedin')

Router.get('/', isNotLoggedIn, orderController.list)

// Router.get('/new', orderController.new)

Router.get('/:id', isNotLoggedIn, orderController.show)

Router.get('/:id/edit', isNotLoggedIn, orderController.edit)

Router.post('/', orderController.create)

Router.put('/:id', isNotLoggedIn, orderController.update)

Router.delete('/:id', isNotLoggedIn, orderController.delete)

module.exports = Router
