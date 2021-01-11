const {
    modelAllOrders,
    modelDetailOrders,
    modelDeleteOrders,
    modelPostOrders,
    modelDeleteDetails,
    modelUpdateDetails
} = require('../models/orders')

const moment = require('moment'); // require Momentjs

module.exports = {
    getAllOrders: (req, res) => {
        const page = req.query.page == undefined ? '1' : req.query.page
        const limit = req.query.limit == undefined ? '5' : req.query.limit
        const offset = page === 1 ? 0 : (page - 1) * limit
        const sort = req.query.sort == undefined ? 'asc' : (req.query.sort).toLowerCase()
        const availSort = ['asc', 'desc']
        if (isNaN(page) || availSort.includes(sort.toLowerCase()) == false || isNaN(limit)) {
            res.json({
                message: "Wrong parameter",
                status: "ERROR"
            })
        } else {
            modelAllOrders(offset, limit, sort)
                .then((response) => {
                    if (response.length != 0) {
                        res.json(response)
                    } else {
                        res.json({
                            message: "No Data on this page",
                            status: "ERROR"
                        })
                    }
                })
                .catch((error) => {
                    res.send(error.message)
                })
        }
    },
    getDetailOrders: (req, res) => {
        const inv = req.params.inv
        if (isNaN(inv)) {
            res.json({
                message: "Wrong Invoice Type",
                status: "ERROR"
            })
        } else {
            modelDetailOrders(inv)
                .then((response) => {
                    if (response.length != 0) {
                        res.json(response)
                    } else {
                        res.json({
                            message: 'Data Not Found, Wrong Invoice!',
                            status: 'ERROR'
                        })
                    }
                })
                .catch((error) => {
                    res.send(error.message)
                })
        }
    },
    deleteOrders: (req, res) => {
        const inv = req.params.inv
        if (isNaN(inv)) {
            res.json({
                message: "Wrong Invoice Type",
                status: "ERROR"
            })
        } else {
            modelDeleteOrders(inv)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        res.json({
                            message: 'Orders Deleted!',
                            status: 'OK'
                        })
                    } else {
                        res.json({
                            message: 'Nothing Deleted, Wrong Invoice!',
                            status: 'ERROR'
                        })
                    }
                })
                .catch((error) => {
                    res.send(error.message)
                })
        }
    },
    postOrders: (req, res) => {
        const data = req.body
        if (data.length != 0) {
            modelPostOrders(data)
                .then(() => {
                    res.json({
                        message: 'Orders Added!',
                        status: 'OK'
                    })
                })
                .catch((error) => {
                    res.send(error.message)
                })
        } else {
            res.send("ERROR : Please fill all field!")
        }
    },
    deleteOrdersDtl: (req, res) => {
        const id = req.query.id
        if (isNaN(id)) {
            res.json({
                message: "Wrong ID Type",
                status: "ERROR"
            })
        } else {
            modelDeleteDetails(id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        res.json({
                            message: 'Item Deleted from Order!',
                            status: 'OK'
                        })
                    } else {
                        res.json({
                            message: 'Nothing Deleted, Wrong ID!',
                            status: 'ERROR'
                        })
                    }
                })
                .catch((error) => {
                    res.send(error)
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
            res.json({
                message: "Wrong ID Type",
                status: "ERROR"
            })
        } else if (data.length == 0) {
            res.send("ERROR : Please fill all field!")
        } else {
            modelUpdateDetails(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        res.json({
                            message: 'Item Updated!',
                            status: 'OK'
                        })
                    } else {
                        res.json({
                            message: 'Nothing Updated, Wrong ID!',
                            status: 'ERROR'
                        })
                    }
                })
                .catch((error) => {
                    res.send(error)
                })
        }
    }

}