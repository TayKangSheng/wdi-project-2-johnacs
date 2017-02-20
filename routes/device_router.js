const express = require('express')
const Router = express.Router()
const deviceController = require('../controllers/device_controller')

Router.get('/', deviceController.list)

Router.get('/new', deviceController.new)

Router.get('/:id', deviceController.show)

Router.get('/:id/edit', deviceController.edit)

Router.post('/', deviceController.create)

Router.put('/:id', deviceController.update)

Router.delete('/:id', deviceController.delete)

module.exports = Router
