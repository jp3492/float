const mongoose = require('mongoose')
const User = mongoose.model('users')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.get('/auth/user', async (req, res) => {
    if (req.session && req.session.user) {
      const user = await User.findById(req.session.user)
      res.send(user)
    } else {
      res.send(false)
    }
  })
  app.get('/auth/logout', async (req, res, next) => {
    if (req.session) {
      req.session.destroy( err => {
        if (err) {
          return next(err)
        } else {
          return res.redirect('/')
        }
      })
    }
  })
  app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const salt = await bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(password, salt)
    const check = await bcrypt.compare(password, hash)
    if (check === true) {
      req.session.user = user._id
      res.send(user._id)
    } else {
      res.send('authentication failed')
    }
  })
  app.post('/auth/register', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      res.send('email already registered')
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        email,
        password: hash
      })
      await newUser.save()
      res.send('new user registerde under:'+email)
    }
  })
}
