var passport = require('passport')
var express = require('express')
var Router = express.Router()


function isLoggedIn (req, res, next) {
 if (!req.isAuthenticated()) return next()

 req.flash('flash', {
   type: 'danger',
   message: 'You have logged in'
 })
 res.redirect('/')
}


Router.get('/signup',isLoggedIn, function (req, res) {
  // res.send('signup')
  res.render('auth/signup',{
    flash: req.flash('flash')[0]
  })
})

Router.get('/login', isLoggedIn, function (req, res) {
  // res.send('login')
  res.render('auth/login',{flash: req.flash('flash')[0]})
})

Router.post('/signup',isLoggedIn, function (req, res) {
// res.send('post signup')
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  })

  return signupStrategy(req, res)
})


Router.post('/login',isLoggedIn, function (req, res) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/order',
    failureRedirect: '/login',
    failureFlash: true
  })

  return loginStrategy(req, res)
})


Router.get('/logout', function (req, res) {
  req.logout() // remove the session => req.user = undefined, req.isAuthenticated()= false
  res.redirect('/')
})

module.exports = Router


// const express = require('express')
// const Router = express.Router()
// const authController = require('../controllers/auth_controller')
//
// Router.get('/', authController.list)
//
// Router.get('/new', authController.new)
//
// Router.get('/:id', authController.show)
//
// Router.get('/:id/edit', authController.edit)
//
// Router.post('/device', authController.create)
//
// Router.put('/:id', authController.update)
//
// Router.delete('/:id', authController.delete)
//
// module.exports = Router
