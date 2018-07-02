const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
   type: String,
   unique: true,
   trim: true
  },
  firstName: String,
  lastName: String,
  password: String
})

const User = mongoose.model('users', UserSchema)
module.exports = User
