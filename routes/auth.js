const mongoose = require('mongoose')
const User = mongoose.model('users')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.post('/auth/register', async (req, res) => {
    const { email, password } = req.body
    const user = await User.find({ email })
    if (user[0]) {
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
