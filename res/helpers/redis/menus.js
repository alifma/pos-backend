// Redis Client
const client = require('../../config/redis')

// Response Helper 
const { error, success } = require('../../helpers/response')

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
          const resAwal = JSON.parse(result)
          const response = resAwal.map(i => ({	
            ...i,	
            isClicked: false	
          }))
          // Ambil Parameter Yang dibutuhkan
          const limit = req.query.limit ? Number(req.query.limit) : 9
          const page = req.query.page ? Number(req.query.page) : 1
          const name = req.query.name ? req.query.name : ''
          const offset = page === 1 ? 0 : (page - 1) * limit
          const orderby = req.query.order ? req.query.order : 'id'
          const sort = req.query.sort ? req.query.sort : 'ASC'
          const deleteStatus = req.query.ready ? req.query.ready : 1
          // Banyaknya Menu Yang ada
          const totalMenus= response.length
          // Filter Menu yang Aktif
          const dataFilterStatus = _.filter(response, (item)=>{ return item.isReady == deleteStatus })
          // Filter Menu Berdasarkan Name
          const dataFilterName = _.filter(dataFilterStatus, (item)=>{ return item.name.toLowerCase().includes(name.toLowerCase()) || item.name.toLowerCase().includes(name)})
          // Pengurutan Data
          const dataOrdered = _.orderBy(dataFilterName, orderby, sort)
          // Data Dibuat Per Halaman
          const dataPaginated = _.slice(dataOrdered, offset, offset+limit)
          // Banyaknya Data Yang memenuhi Filter Name
          const totalResult = dataFilterName.length
          // Daftar Halaman
          const listPages = []
          for(let i = 1; i <= Math.ceil(dataOrdered.length / limit); i++){
              listPages.push('?name='+name+'&limit='+limit+'&page='+i)
          }
          if(dataPaginated.length != 0){
            const pagination = {
              // Halaman Saat Ini
              page,
              // Limit Tiap Halaman
              limit,
              // Banyaknya Menus yang ada
              totalMenus,
              // Banyaknya Menus yang Memenuhi Filter
              totalResult,  
              // Status yang Ditampilkan:
              menusType: deleteStatus == 1 ? 'Active' : 'Inactive',
              // Banyaknya Halaman Yang Memenuhi Filter
              pageResult: Math.ceil(dataOrdered.length / limit),
              // Daftar Pages yang tersedia
              listPages
            }
            success(res, 200, 'Display Menu From Redis', pagination, dataPaginated)
          }else{
            error(res, 400, 'No data on this page', '0 Result', {})
          }
        }else{
          next()
        }
      }
    })
  }
}