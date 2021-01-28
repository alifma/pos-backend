// Redis Client
const client = require('../../config/redis')

// Response Helper 
const {
  error,
  success
} = require('../response')

// Lodash
var _ = require('lodash');
const moment = require('moment');

module.exports = {
  getRedisOrders: (req, res, next) => {
    client.get('dataOrders', (err, result) => {
      if (err) {
        // Kalau ada gangguan pas getData
        console.log(err)
      } else {
        if (result) {
          // Ambil data Response
          const response = JSON.parse(result)
          // Ambil parameter yang dibutuhkan
          const page = req.query.page ? Number(req.query.page) : 1
          const limit = req.query.limit ? Number(req.query.limit) : 5
          const offset = page === 1 ? 0 : (page - 1) * limit
          const sort = req.query.sort ? req.query.sort : 'desc'
          const range = req.query.range ? req.query.range : 'year'
          // Data Filter Range
          const dataFilter = _.filter(response, (i) => {
            return (moment(i.created_at).valueOf() <= moment().valueOf()) && (moment(i.created_at).valueOf() >= moment().subtract(1, `${range}`).valueOf())
          })
          // Sorting Data
          const dataSorted = _.orderBy(dataFilter, 'created_at', `${sort}`)
          // Data Paginated
          const dataPaginated = _.slice(dataSorted, offset, offset + limit)
          // Daftar Halaman
          const listPages = []
          for (let i = 1; i <= Math.ceil(dataFilter.length / limit); i++) {
            listPages.push('?limit=' + limit + '&page=' + i)
          }
          if (dataPaginated.length != 0) {
            const pagination = {
              // Halaman saaat ini
              page,
              // Limit tiap halaman
              limit,
              // Display Range
              range,
              // Banyaknya Orders
              total: response.length,
              // Banyaknya Orders
              totalResult: dataFilter.length,
              // Banyaknya Halaman
              pageResult: Math.ceil(dataFilter.length / limit),
              // Daftar Halaman Tersedia
              listPages
            }
            success(res, 200, 'Display Orders From Redis', pagination, dataPaginated)
          } else {
            error(res, 400, 'No data on this page', '0 Result', {})
          }
        } else {
          next()
        }
      }
    })
  }
}