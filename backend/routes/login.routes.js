const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/', async (req, res) => {
  const { email, password } = req.body
  console.log(email)

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    return res.status(404).json({
      ok: false,
      message: 'User not found',
    })
  } else {
    if (!user.activated) {
      return res.status(404).json({
        ok: false,
        message: 'User not activated',
      })
    }
    if (await user.validatePassword(password)) {
      const token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: '24h',
      })
      const usr = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        tower: user.tower,
        apartment: user.apartment,
        role: user.role,
      }
      res.status(200).json({
        ok: true,
        user: usr,
        token: token,
      })
    } else {
      res.status(400).json({
        ok: false,
        message: 'Invalid password',
      })
    }
  }
})

module.exports = router
