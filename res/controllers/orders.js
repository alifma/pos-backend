const {
    modelAllOrders,
    modelDetailOrders,
    modelDeleteOrders,
    modelPostOrders,
    modelDeleteDetails,
    modelUpdateDetails,
    modelTotalOrders
} = require('../models/orders')
// Moment JS
const moment = require('moment');
// Response Helper
const {
    error,
    success
} = require('../helpers/response')

module.exports = {
    getAllOrders: async (req, res) => {
        const page = req.query.page ? req.query.page : '1'
        const limit = req.query.limit ? req.query.limit : '5'
        const offset = page === 1 ? 0 : (page - 1) * limit
        const sort = req.query.sort ? (req.query.sort).toLowerCase() : 'asc'
        const availSort = ['asc', 'desc']
        const total = await modelTotalOrders()
        if (isNaN(page) || availSort.includes(sort.toLowerCase()) == false || isNaN(limit)) {
            error(res, "Wrong Parameter Type", {}, {})
        } else {
            modelAllOrders(offset, limit, sort)
                .then((response) => {
                    if (response.length != 0) {
                        const pagination = {
                            page: page,
                            limit: limit,
                            totalInvoices: total[0].total,
                            totalPage: Math.ceil(total[0].total / limit),
                        }
                        success(res, 'Display All Order Success', pagination, response)
                    } else {
                        error(res, 'No data on this page', {}, {})
                    }
                })
                .catch((error) => {
                    error(res, `Server Side Error ${error.message}`, {}, {})
                })
        }
    },
    getDetailOrders: (req, res) => {
        const inv = req.params.inv
        if (isNaN(inv)) {
            error(res, "Wrong Invoice Type", {}, {})
        } else {
            modelDetailOrders(inv)
                .then((response) => {
                    if (response.length != 0) {
                        success(res, `Show Detail Data Success`, {}, response)
                    } else {
                        error(res, `Data Not Found, Wrong Invoice`, {}, {})
                    }
                })
                .catch((error) => {
                    error(res, `Server Side Error ${error.message}`, {}, {})
                })
        }
    },
    deleteOrders: (req, res) => {
        const inv = req.params.inv
        if (isNaN(inv)) {
            error(res, "Wrong Invoice Type", {}, {})
        } else {
            modelDeleteOrders(inv)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        success(res, `Delete Order Sucess`, {}, {})
                    } else {
                        error(res, `Nothing Deleted, Wrong Invoice`, {}, {})
                    }
                })
                .catch((error) => {
                    error(res, `Server Side Error ${error.message}`, {}, {})
                })
        }
    },
    postOrders: (req, res) => {
        const data = req.body
        if (data.length != 0) {
            modelPostOrders(data)
                .then(() => {
                    success(res, "Add Order Success", {}, {})
                })
                .catch((error) => {
                    error(res, `Server Side Error ${error.message}`, {}, {})
                })
        } else {
            error(res, "Please Fill All Field", {}, {})
        }
    },
    deleteOrdersDtl: (req, res) => {
        const id = req.query.id
        if (isNaN(id)) {
            error(res, "Wrong ID Type", {}, {})
        } else {
            modelDeleteDetails(id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        success(res, "Delete Order by Detail Success", {}, {})
                    } else {
                        error(res, "Nothing Deleted, Wrong ID", {}, {})
                    }
                })
                .catch((error) => {
                    error(res, `Server Side Error ${error.message}`, {}, {})
                })
        }
    },
    updateOrdersDtl: (req, res) => {
        const id = req.params.id
        const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
        const data = {
            ...req.body,
            "updated_at": currDate
        }
        if (isNaN(id)) {
            error(res, "Wrong ID Type", {}, {})
        } else if (data.length == 0) {
            error(res, "Please Fill All Field", {}, {})
        } else {
            modelUpdateDetails(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        success(res, "Update Order Success", {}, {})
                    } else {
                        error(res, "Nothing Updated, Wrong ID", {}, {})
                    }
                })
                .catch((error) => {
                    error(res, `Server Side Error ${error.message}`, {}, {})
                })
        }
    }

}