const express = require('express')
const Router = express.Router()
const customerController = require('../controllers/customer_controller')

let isNotLoggedIn = require('./isnotloggedin')

Router.get('/', isNotLoggedIn, customerController.list)

Router.get('/new', isNotLoggedIn, customerController.new)

Router.get('/:id', isNotLoggedIn, customerController.show)

Router.get('/:id/edit', isNotLoggedIn, customerController.edit)

Router.post('/', isNotLoggedIn, customerController.create)

Router.put('/:id', isNotLoggedIn, customerController.update)

Router.delete('/:id', isNotLoggedIn, customerController.delete)

module.exports = Router
