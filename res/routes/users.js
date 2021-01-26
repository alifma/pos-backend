const { login, register } = require('../controllers/users')
const express = require('express')

const route = express.Router()
route
  .post('/login', login)
  .post('/register', register)

module.exports = route