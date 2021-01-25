const connection = require('../config/database')

module.exports = {
  mLogin: () => {
    return
  },
  mCheckEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if(err) {
          reject(err)
        }else{
          resolve(result)
        }
      })
    })
  },
  mRegister: (dataUsers) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', dataUsers, (err, result) => {
        if(err) {
          reject(err)
        }else{
          resolve(result)
        }
      })
    })
  }
}