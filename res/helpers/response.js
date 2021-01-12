// Export Semua Method
module.exports = {

    // Kalau Tidak ada Error
    success: (res, message, pagination, arr) => {
        res.json({
            code: 200,
            msg: message,
            pagination,
            data: arr
        })
    },

    // Kalau ada error
    error: (res, message, pagination, arr) => {
        res.json({
            code: 500,
            msg: message,
            pagination,
            data: arr
        })
    },

    // Kalau tidak ketemu routenya
    notFound: (res, message) => {
        res.json({
            code: 404,
            msg: message,
        })
    }

}