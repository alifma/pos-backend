module.exports = {
    success: (res, message, pagination, arr) => {
        res.json({
            code: 200,
            msg: message,
            pagination,
            data: arr
        })

    },
    error: (res, message, pagination, arr) => {
        res.json({
            code: 500,
            msg: message,
            pagination,
            data: arr
        })
    }
}