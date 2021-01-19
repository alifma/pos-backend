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
    modelTotalIncome
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
        const page = req.query.page ? req.query.page : '1'
        const limit = req.query.limit ? req.query.limit : '5'
        const offset = page === 1 ? 0 : (page - 1) * limit
        const sort = req.query.sort ? (req.query.sort).toLowerCase() : 'asc'
        const range = req.query.range ? (req.query.range).toUpperCase() : 'YEAR'
        const total = await modelTotalOrders(range)
        const allIncome = await modelTotalIncome()
        const ttlRange = await modelTotalRange(range)
        const availSort = ['asc', 'desc']
        const availRange = ['day', 'week', 'month', 'year']
        if (isNaN(page) || availSort.includes(sort.toLowerCase()) == false || isNaN(limit) || availRange.includes(range.toLowerCase()) == false) {
            //   Kalau parameter ada yang salah
            error(res, 400, "Wrong Parameter Type", {}, {})
        } else {
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
                            page: page,
                            limit: limit,
                            totalInvoices: total[0].total,
                            totalPage: Math.ceil(total[0].total / limit),
                            totalIncome: Number(allIncome[0].totalIncome),
                            todaysIncome: Number(ttlRange[0].totalIncome)
                        }
                        // Kalau hasilnya bukan array kosong
                        success(res, 200, 'Display All Order Success', pagination, arr)
                    } else {
                        // Kalau hasilnya array kosong
                        error(res, 400, 'No data on this page', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau ada salah di model
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    },

    // Tampilkan Detail Item Tiap Invoices
    getDetailOrders: (req, res) => {
        const inv = req.params.inv
        if (isNaN(inv)) {
            error(res, "Wrong Invoice Type", {}, {})
        } else {
            modelDetailOrders(inv)
                .then((response) => {
                    if (response.length != 0) {
                        // Kalau ada data yang bisa ditampilkan
                        success(res, 200, `Show Detail Data Success`, {}, response)
                    } else {
                        // kalau tidak ada datanya
                        error(res, 400, `Data Not Found, Wrong Invoice`, {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau ada error dari model
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    },

    // Hapus semua order berdasarkan invoice
    deleteOrders: (req, res) => {
        const inv = req.params.inv
        if (isNaN(inv)) {
            // Kalau tipe invoice bukan number
            error(res, 400, "Wrong Invoice Type", {}, {})
        } else {
            modelDeleteOrders(inv)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau ada yang terhapus
                        success(res, 200, `Delete Order Sucess`, {}, {})
                    } else {
                        // Kalau tidak ada yang terhapus
                        error(res, 400, `Nothing Deleted, Wrong Invoice`, {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau ada error dari model
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    },

    // Tambahkan Order baru
    postOrders: (req, res) => {
        const data = req.body
        if (data.length == 0 || data[0].inv == '' || data[0].cashier == '') {
            // Kalau ada data yang kosong
            error(res, 400, "Please Fill All Field", {}, {})
        } else {
            modelPostOrders(data)
                .then(() => {
                    // Kalau berhasil menambahkan
                    success(res, 200, "Add Order Success", {}, {})
                })
                .catch((err) => {
                    // Kalau ada error dari model
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    },

    // Hapus item di dalam invoice berdasarkan ID
    deleteOrdersDtl: (req, res) => {
        const id = req.query.id
        if (isNaN(id)) {
            // Kalau parameter ID salah
            error(res, 400, "Wrong ID Type", {}, {})
        } else {
            modelDeleteDetails(id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau berhaisl menghapus deetail
                        success(res, 200, "Delete Order by Detail Success", {}, {})
                    } else {
                        // Kalau gagal menghapus karena salah ID
                        error(res, 400, "Nothing Deleted, Wrong ID", {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau ada salah dari model
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    },

    // Perbarui Item di dalam inovice berdasarkan id
    updateOrdersDtl: (req, res) => {
        const id = req.params.id
        const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
        const data = {
            ...req.body,
            "updated_at": currDate
        }
        if (isNaN(id)) {
            // Kalau idnya salah
            error(res, 400, "Wrong ID Type", {}, {})
        } else if (data.length == 0) {
            // Kalau ada data yang kosong
            error(res, 400, "Please Fill All Field", {}, {})
        } else {
            modelUpdateDetails(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau berhasil mengupdate
                        success(res, 200, "Update Order Success", {}, {})
                    } else {
                        // Kalau salah ID hapus
                        error(res, 400, "Nothing Updated, Wrong ID", {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau misalkan ada error dari model
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    }

}