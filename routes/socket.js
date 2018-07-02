const mongoose = require('mongoose')
const User = mongoose.model('users')
const Room = mongoose.model('rooms')
const util = require('util')

module.exports = (wss, online) => {
  wss.on('connection', async (ws, req) => {
      const noConnection = online.every( u => { return u._id.toString() !== req.session.user.toString() })
      if (noConnection === true) {
        online.push({ _id: req.session.user, socket: ws })
      } else {
        online = online.map( u => {
          if (u._id.toString() === req.session.user.toString()) {
            return { ...u, socket: ws }
          }
          return u
        })
      }
      console.log(online.length+" ", 'user online');
      ws.on('message', message => {
          console.log('received message:' + message)
          if (message === 'disconnect') {
            online = online.filter( u => { return u._id.toString() !== req.session.user.toString()})
            console.log(online.length+" ", 'user online');
          }
      })
  })
}
