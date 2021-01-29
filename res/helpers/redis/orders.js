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
          const startDate = moment().format('YYYY-MM-DD') 
          const endDate = moment().subtract(1,`${range}`).format('YYYY-MM-DD')
          const dataFilter = _.filter(response, (i) => {
            let dataDate = moment(i.created_at).format('YYYY-MM-DD')
            return ((dataDate > endDate) && (dataDate <= startDate))
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
              // Total Invoices
              totalOrders: response.length,
              // Banyak Order Minggu Ini
//              thisWeekOrders:
              // Banyak Order Minggu Kemarin 
//              lastWeekOrders:
              // Order Gain Lastweek
//               gainOrders: ((ordersThisWeek[0].total-ordersLastweek[0].total)/ordersLastweek[0].total)*100,
              // Banyaknya Orders Yang Sesuai
              totalResult: dataFilter.length,
              // Jumlah Halaman
              totalPages: Math.ceil(dataFilter.length / limit),
              // Jumlah Total Pemasukan
//              totalIncome: Number(allIncome[0].totalIncome),
              // Jumlah Pemasukan Hari Ini
//             todaysIncome: Number(ttlRange[0].totalIncome),
              // Jumlah Pemasukan Kemarin
//              YesterdayIncome: Number(incomeYesterday[0].yesterdayIncome),
              // Kenaikan Penjualan
//              gainIncome: (((ttlRange[0].totalIncome-incomeYesterday[0].yesterdayIncome)/incomeYesterday[0].yesterdayIncome)*100).toFixed(2) == Infinity?0:(((ttlRange[0].totalIncome-incomeYesterday[0].yesterdayIncome)/incomeYesterday[0].yesterdayIncome)*100).toFixed(2) == Infinity,
              // Daftar Halaman Tersedia
              listPages

              /*
        "page": "2",
        "limit": "5",
        "range": "YEAR",
        "allOrders": 6,
        "thisWeekOrders": 4,
        "lastWeekOrders": 1,
        "gainOrders": 300,
        "totalResult": 6,
        "totalPages": 2,
        "totalIncome": 244000,
        "todaysIncome": 35000,
        "YesterdayIncome": 139000,
        "gainIncome": "-74.82",
        "listPages": [
            "?range=YEAR&limit=5&sort=desc&page=1",
            "?range=YEAR&limit=5&sort=desc&page=2"
        ]
              */
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