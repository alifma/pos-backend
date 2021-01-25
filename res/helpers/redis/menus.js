const client = require('../../config/redis')
// Response Helper 
const { success } = require('../../helpers/response')

module.exports = {
  getRedisMenus: (req, res, next) => {
    client.get('dataMenus', (err, result) => {
      if(err){
        console.log(err)
      }else{
        if(result){
          const response = JSON.parse(result)
          success(res, 200, 'Display Menu Success', {}, response)
        }else{
          next()
        }
      }
    })
  }
}