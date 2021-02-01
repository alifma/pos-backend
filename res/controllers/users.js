const bcrypt = require('bcrypt')
const { mRegister, mLogin, mCheckEmail } = require('../models/users')
const jwt = require('jsonwebtoken')
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
          res.json({msg: 'Login Success', token: jwttoken})
        }else{
          res.json({msg: 'Pasword salah'})
        }
      }else{
        res.json({msg: 'Email Belum terdaftar'})
      }
    })
    .catch((err)=> res.json(err.message))
  },
  register : async (req, res) => {
    const body = req.body
    mCheckEmail(body.email)
    .then(async (response)=>{
      if(response.length >= 1) {
        res.json({msg: 'Email Sudah terdaftar'})
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
        .then((response)=>res.json(response))
        .catch((err)=> res.json(err.message))
      }
    })
    .catch((err)=> res.json(err.message))
  },
}