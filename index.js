const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const keys = require('./config/keys')
const WebSocket = require('ws')

const app = express()
const server = require('http').Server(app)

let online = []

const sessionParser = session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
})

mongoose.connect(keys.mongoURI)

require('./models/room')
require('./models/user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(sessionParser)
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    // console.log('you are logged in', req.session.user);
    return next()
  } else {
    // console.log('you must be logged in');
    return next()
  }
})

const wss = new WebSocket.Server({
  verifyClient: (info, done) => {
    sessionParser(info.req, {}, () => {
      done(info.req.session.user)
    })
  },
  server
});

require('./routes/auth')(app, online)
require('./routes/socket')(wss, online)

const PORT = process.env.PORT || 7000
server.listen(PORT, () => {
  console.log('Server listening on port: '+PORT)
})
