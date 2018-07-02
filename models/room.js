const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  _uid: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  socket: String
})

const RoomSchema = new Schema({
  name: String,
  users: [UserSchema]
})

const Room = mongoose.model('rooms', RoomSchema)
module.exports = Room
