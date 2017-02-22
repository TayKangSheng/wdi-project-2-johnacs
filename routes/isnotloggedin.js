// function for only loggin user to access animal pages
function isNotLoggedIn (req, res, next) {
 if (req.isAuthenticated()) return next()

 req.flash('flash', {
   type: 'danger',
   message: 'Restricted page: please login'
 })
 return res.redirect('/login')
}

module.exports = isNotLoggedIn
