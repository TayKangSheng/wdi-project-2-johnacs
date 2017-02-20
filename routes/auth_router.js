const express = require('express')
const Router = express.Router()
const authController = require('../controllers/auth_controller')

Router.get('/', authController.list)

Router.get('/new', authController.new)

Router.get('/:id', authController.show)

Router.get('/:id/edit', authController.edit)

Router.post('/device', authController.create)

Router.put('/:id', authController.update)

Router.delete('/:id', authController.delete)

module.exports = Router
