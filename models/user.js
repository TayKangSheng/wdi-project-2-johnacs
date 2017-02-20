const bcrypt = require('bcrypt');

var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String
  }
})


UserSchema.statics.encrypt = function (password) {
  // return 'the hashed password'
  // 10 argument number of saltround
  return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validPassword = function (givenPassword) {
  return bcrypt.compareSync(givenPassword, this.local.password)
}


var User = mongoose.model('User', UserSchema)

module.exports = User
