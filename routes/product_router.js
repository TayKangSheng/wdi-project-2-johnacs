const express = require('express')
const Router = express.Router()
const productController = require('../controllers/product_controller')

let isNotLoggedIn = require('./isnotloggedin')

Router.get('/', isNotLoggedIn, productController.list)

Router.get('/new',isNotLoggedIn, productController.new)

Router.get('/:id', isNotLoggedIn, productController.show)

Router.get('/:id/edit', isNotLoggedIn, productController.edit)

// no create function since order is generated automatically
Router.post('/', isNotLoggedIn, productController.create)

Router.put('/:id', isNotLoggedIn, productController.update)

Router.delete('/:id', isNotLoggedIn, productController.delete)

module.exports = Router
