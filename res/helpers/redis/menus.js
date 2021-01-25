// Redis Client
const client = require('../../config/redis')

// Response Helper 
const { success } = require('../../helpers/response')

// Lodash
var _ = require('lodash');

// Export Module
module.exports = {
  getRedisMenus: (req, res, next) => {
    client.get('dataMenus', (err, result) => {
      if(err){
        // Kalau ada gangguan pas getData
        console.log(err)
      }else{
        if(result){
          // Ambil data Response
          const response = JSON.parse(result)
          // Ambil Parameter Yang dibutuhkan
          const limit = req.query.limit ? Number(req.query.limit) : 9
          const page = req.query.page ? Number(req.query.page) : 1
          const name = req.query.name ? req.query.name : ''
          const offset = page === 1 ? 0 : (page - 1) * limit
          const orderby = req.query.order ? req.query.order : 'id'
          const sort = req.query.sort ? req.query.sort : 'ASC'
          // Banyaknya Menu Yang ada
          const totalMenus= response.length
          // Filter Menu Berdasarkan Name
          const dataFilterName = _.filter(response, (item)=>{ return item.name.includes(name) })
          // Banyaknya Data Yang memenuhi Filter Name
          const totalResult = dataFilterName.length
          // Pengurutan Data
          let dataOrdered = []
          if(sort == 'ASC' || sort == 'asc'){
            dataOrdered = _.sortBy(dataFilterName, orderby)
          }else{
            dataOrdered = _.sortBy(dataFilterName, orderby).reverse()
          }
          // Data Dibuat Per Halaman
          const dataPaginated = _.slice(dataOrdered, offset, offset+limit)
          // Daftar Halaman
          const listPages = []
          for(let i = 1; i <= Math.ceil(dataOrdered.length / limit); i++){
              listPages.push('?name='+name+'&limit='+limit+'&page='+i)
          }
          const pagination = {
            // Halaman Saat Ini
            page,
            // Limit Tiap Halaman
            limit,
            // Banyaknya Menus yang ada
            totalMenus,
            // Banyaknya Menus yang Memenuhi Filter
            totalResult,  
            // Banyaknya Halaman Yang Memenuhi Filter
            pageResult: Math.ceil(dataOrdered.length / limit),
            // Daftar Pages yang tersedia
            listPages
          }
          success(res, 200, 'Display Menu From Redis', pagination, dataPaginated)
        }else{
          next()
        }
      }
    })
  }
}