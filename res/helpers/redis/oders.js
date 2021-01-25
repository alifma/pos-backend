// Redis Client
const client = require('../../config/redis')

// Response Helper 
const { success } = require('../../helpers/response')

// Lodash
var _ = require('lodash');
const moment = require('moment');

module.exports = {
  getRedisOrders: (req, res, next) => {
    client.get('dataOrders', (err, result) => {
      if(err){
        // Kalau ada gangguan pas getData
        console.log(err)
      }else{
        if(result){
          // Ambil data Response
          const response = JSON.parse(result)
          // Ambil parameter yang dibutuhkan
          const page = req.query.page ? Number(req.query.page) : 1
          const limit = req.query.limit ? Number(req.query.limit) : 5
          const offset = page === 1 ? 0 : (page - 1) * limit
          const sort = req.query.sort ? req.query.sort : 'DESC'
          const range = req.query.range ? req.query.range : 'WEEK'
          // Data Paginated
          const dataPaginated = _.slice(response, offset, offset+limit)
          // Daftar Halaman
          const listPages = []
          for(let i = 1; i <= Math.ceil(response.length / limit); i++){
            listPages.push('?limit='+limit+'&page='+i)
        }
          const pagination = {
            // Halaman saaat ini
            page,
            // Limit tiap halaman
            limit,
            // Banyaknya Orders
            total: response.length,
            // Banyaknya Halaman
            pageResult: Math.ceil(response.length / limit),
            // Daftar Halaman Tersedia
            listPages
          }
          // console.log(response)
          success(res, 200, 'Display Orders From Redis', pagination, dataPaginated)
        }else{
          next()
        }
      }
    })
  }
}