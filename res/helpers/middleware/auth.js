const jwt = require('jsonwebtoken')
module.exports = {
  authentication: (req, res, next) => {
    const headers = req.headers
    if(!headers.token){
      res.json({msg: 'Token Required'})
    }else{
      jwt.verify(headers.token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
          res.json({msg: 'Token Not Valid'})
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
      res.json({msg: 'Access Not Allowed'})
    }
  },
  authorizeCashier: (req, res, next) => {
    const access = res.userAccess
    if(access === 1) {
      next()
    }else{
      res.json({msg: 'Access Not Allowed'})
    }
  },
}