const jwt = require('jsonwebtoken')
const { error } = require('../../helpers/response')
module.exports = {
  authentication: (req, res, next) => {
    const headers = req.headers
    if(!headers.token){
      error(res, 400, 'Token Required', 'No Token', {})
    }else{
      jwt.verify(headers.token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
          error(res, 400, 'Invalid Token', err.message, {})
        }else{
          res.userAccess = decoded.access
          next()
        }
      })
    }
  },
  authorizeAdmin: (req, res, next) => {
    const access = res.userAccess
    if(access === 0) {
      next()
    }else{
      error(res, 400, 'Access Not Allowed', 'No Access', {})
    }
  },
  authorizeCashier: (req, res, next) => {
    const access = res.userAccess
    if(access === 1) {
      next()
    }else{
      error(res, 400, 'Access Not Allowed', 'No Access', {})
    }
  },
}