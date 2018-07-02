const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String
})

const User = mongoose.model('users', UserSchema)
module.exports = User
