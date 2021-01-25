const client = require('../../config/redis')

module.exports = {
  getMenus: (req, res, next) => {
    client.get('dataMenus', (err, result) => {
      if(err){
        console.log(err)
      }else{
        if(result){
          console.log(result)
        }else{
          next()
        }
      }
    })
  }
}