// Model Orders
const {
    modelAllOrders,
    modelDetailOrders,
    modelDeleteOrders,
    modelPostOrders,
    modelDeleteDetails,
    modelUpdateDetails,
    modelTotalOrders,
    modelTotalRange,
    modelTotalIncome,
    modelLastWeekOrders,
    modelTotalYesterday
} = require('../models/orders')

// Moment JS
const moment = require('moment');

// Response Helper
const {
    error,
    success
} = require('../helpers/response')

// Export Semua Method
module.exports = {
    // Tampilkan Semua Order Berdasarkan Invoices
    getAllOrders: async (req, res) => {
        try {
            // Ambil Query dari URL
            const sort = req.query.sort ? (req.query.sort).toUpperCase() : 'DESC'
            const range = req.query.range ? (req.query.range).toUpperCase() : 'WEEK'
            const page = req.query.page ? req.query.page : '1'
            const limit = req.query.limit ? req.query.limit : '5'
            const offset = page === 1 ? 0 : (page - 1) * limit
            // Ambil Dari Modal pakai Await
            const allIncome = await modelTotalIncome()
            const total = await modelTotalOrders(range)
            const ttlRange = await modelTotalRange('DAY')
            const incomeYesterday = await modelTotalYesterday()
            const ordersLastweek = await modelLastWeekOrders()
            const ordersThisWeek = await modelTotalOrders('WEEK')
            const listPage = []
            for (let i = 1; i <=Math.ceil(total[0].total / limit);i++){
                listPage.push('?range='+range+'&limit='+limit+'&sort='+sort+'&page='+i)
            }
            modelAllOrders(offset, limit, sort, range)
                .then((response) => {
                    if (response.length != 0) {
                        const arr = response.map(i => ({
                            inv: Number(i.inv),
                            cashier: i.cashier,
                            created_at: i.created_at,
                            orders: i.orders,
                            total: Number(i.total)
                        }))
                        const pagination = {
                            // Halaman yang sedang diakses
                            page: page,
                            // Batasan Banyaknya hasil per halaman
                            limit: limit,
                            // Banyaknya Invoices yang terdaftar
                            totalInvoices: total[0].total,
                            // Banyak Order Minggu ini
                            thisWeekOrders: ordersThisWeek[0].total,
                            // Banyak Order Minggu kemarin
                            lastWeekOrders: ordersLastweek[0].total,
                            // Order Gain Lastweek
                            gainOrders: ((ordersThisWeek[0].total-ordersLastweek[0].total)/ordersLastweek[0].total)*100,
                            // Jumlah Halaman
                            totalPage: Math.ceil(total[0].total / limit),
                            // Jumlah Total Pemasukan
                            totalIncome: Number(allIncome[0].totalIncome),
                            // Jumlah Pemasukan Hari Ini
                            todaysIncome: Number(ttlRange[0].totalIncome),
                            // Jumlah Pemasukan Kemarin
                            YesetdayIncome: Number(incomeYesterday[0].yesterdayIncome),
                            // Kenaikan Penjualan
                            gainIncome: (((ttlRange[0].totalIncome-incomeYesterday[0].yesterdayIncome)/incomeYesterday[0].yesterdayIncome)*100).toFixed(2),
                            // Daftar Page Tersedia
                            pageList: listPage
                        }
                        // Kalau hasilnya bukan array kosong
                        success(res, 200, 'Display All Order Success', pagination, arr)
                    } else {
                        // Kalau hasilnya array kosong
                        error(res, 400, 'No data on this page', '0 Result', {})
                    }
                })
                .catch((err) => {
                    // Kalau Ada salah di Query
                    error(res, 400, 'Wrong Query Given', err.message, {})
                })
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    },

    // Tampilkan Detail Item Tiap Invoices
    getDetailOrders: (req, res) => {
        try {
            // Ambil data dari parameter
            const inv = req.params.inv
            modelDetailOrders(inv)
                .then((response) => {
                    if (response.length != 0) {
                        // Kalau ada datanya
                        success(res, 200, 'Show Detail Data Success', {}, response)
                    } else {
                        // kalau tidak ada datanya
                        error(res, 400, 'Data Not Found, Wrong Invoice', '0 Result', {})
                    }
                })
                .catch((err) => {
                    // Kalau salah parameternya
                    error(res, 400, 'Wrong Parameter Type', err.message, {})
                })
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    },

    // Hapus semua order berdasarkan invoice
    deleteOrders: (req, res) => {
        try {
            const inv = req.params.inv
            modelDeleteOrders(inv)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau ada yang terhapus
                        success(res, 200, 'Delete Order Sucess', {}, {})
                    } else {
                        // Kalau tidak ada yang terhapus
                        error(res, 400, 'Nothing Deleted, Wrong Invoice', '0 Result', {})
                    }
                })
                .catch((err) => {
                    // Kalau ada salah di parameternya
                    error(res, 400, 'Wrong Parameter Type', err.message, {})
                })
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    },

    // Tambahkan Order baru
    postOrders: (req, res) => {
        try {
            // Ambil data dari body
            const data = req.body
            // Inisialisasi Checker
            let dataChecker = false
            for(let i = 0; i<data.length;i++) {
                if(data[i].menu_id && data[i].inv && data[i].cashier && data[i].price){
                    dataChecker = true
                }else{
                    dataChecker = false
                    break
                }
            }
            if (dataChecker) {
                modelPostOrders(data)
                    .then(() => {
                        // Kalau berhasil menambahkan
                        success(res, 200, 'Add Order Success', {}, {})
                    })
                    .catch((err) => {
                        // Kalau ada tipe data yang salah
                        error(res, 400, 'Wrong Data Type Given', err.message, {})
                    })
            } else {
                // Kalau ada data yang kosong
                error(res, 400, 'Please Fill All Field', 'Empty field found', {})
            }
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    },

    // Hapus item di dalam invoice berdasarkan ID
    deleteOrdersDtl: (req, res) => {
        try {
            const id = req.query.id
            modelDeleteDetails(id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau berhasil menghapus detail
                        success(res, 200, 'Delete Order by Detail Success', {}, {})
                    } else {
                        // Kalau gagal menghapus karena salah ID
                        error(res, 400, 'Nothing Deleted, Wrong ID', '0 Result', {})
                    }
                })
                .catch((err) => {
                    // Kalau ada salah tipe data
                    error(res, 400, 'Wrong Parameter Type', err.message, {})
                })
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    },

    // Perbarui Item di dalam inovice berdasarkan id
    updateOrdersDtl: (req, res) => {
        try {
            const id = req.params.id
            const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms')
            const data = {
                ...req.body,
                'updated_at': currDate
            }
            modelUpdateDetails(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau berhasil mengupdate
                        success(res, 200, 'Update Order Success', {}, {})
                    } else {
                        // Kalau salah ID hapus
                        error(res, 400, 'Nothing Updated, Wrong ID', '0 Result', {})
                    }
                })
                .catch((err) => {
                    // Kalau misalkan ada error dari model
                    error(res, 400, 'Wrong Data Type Given', err.message, {})
                })
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    }
}