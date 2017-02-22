const express = require('express')
const Router = express.Router()
const deviceController = require('../controllers/device_controller')

let isNotLoggedIn = require('./isnotloggedin')

Router.get('/', isNotLoggedIn, deviceController.list)

Router.get('/new', isNotLoggedIn, deviceController.new)

Router.get('/:id', isNotLoggedIn, deviceController.show)

Router.get('/:id/edit', isNotLoggedIn, deviceController.edit)

Router.post('/', isNotLoggedIn, deviceController.create)

Router.put('/:id', isNotLoggedIn, deviceController.update)

Router.delete('/:id', isNotLoggedIn, deviceController.delete)

module.exports = Router
