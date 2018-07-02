const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const validator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const Strategy = require('passport-local').Strategy
const keys = require('./config/keys')
const WebSocket = require('ws')

const app = express()
const server = require('http').Server(app)

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log(Object.keys(ws));
    console.log(ws._socket);
    console.log(session.Cookie);
    //connection is up, let's add a simple simple event
    ws.on('message', message => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

mongoose.connect(keys.mongoURI)

require('./models/user')
require('./passport')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// app.use((req, res, next) => {
//   console.log(Date.now())
//   next()
// })

require('./routes/auth')(app)

const PORT = process.env.PORT || 7000
server.listen(PORT, () => {
  console.log('Server listening on port: '+PORT)
})
