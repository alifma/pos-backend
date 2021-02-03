const bcrypt = require('bcrypt')
const { mRegister, mLogin, mCheckEmail } = require('../models/users')
const jwt = require('jsonwebtoken')
// Response Helper 
const { error, success } = require('../helpers/response')

module.exports = {
  login : (req, res) => {
    const body = req.body
    mCheckEmail(body.email)
    .then(async (response)=>{
      if(response.length == 1){
        const checkPassword = await bcrypt.compare(body.password, response[0].password)
        if(checkPassword) {
          const dataUser = {
            email: response[0].email,
            id: response[0].id,
            access: response[0].access
          }
          const jwttoken = jwt.sign(dataUser, process.env.JWT_SECRET)
          success(res, 200, 'Login Success', {token: jwttoken})
        }else{
          error(res, 400, 'Login Failed', 'Wrong Password')
        }
      }else{
        error(res, 400, 'Login Failed', 'Email is not registered')
      }
    })
    .catch((err)=> error(res, 400, 'Login Failed', err.message))
  },
  register : async (req, res) => {
    const body = req.body
    mCheckEmail(body.email)
    .then(async (response)=>{
      if(response.length >= 1) {
        error(res, 400, 'Registration Failed', 'Email already registered')
      }else{
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(body.password, salt)
        const user = {
          name: body.name,
          email: body.email,
          access: body.access,
          password
        }
        mRegister(user)
        .then(()=> success(res, 200, 'Registration Success', {}))
        .catch((err)=> error(res, 400, 'Registration Failed', err.message))
      }
    })
    .catch((err)=> error(res, 400, 'Registration Failed', err.message))
  },
}