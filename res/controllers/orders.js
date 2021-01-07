const {
    modelAllOrders,
    modelDetailOrders,
    modelDeleteOrders,
    modelPostOrders,
    modelDeleteDetails,
    modelUpdateDetails
} = require('../models/orders')


module.exports = {
    getAllOrders: (req, res) => {
        const page = req.query.page == undefined ? '1' : req.query.page
        const limit = 3
        const offset = page === 1 ? 0 : (page - 1) * limit
        const sort = req.query.sort == undefined ? 'ASC' : req.query.sort
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
    },
    getDetailOrders: (req, res) => {
        const inv = req.params.inv
        modelDetailOrders(inv)
            .then((response) => {
                if (response.length != 0) {
                    res.json(response)
                } else {
                    res.json({
                        message: 'Data Not Found!',
                        status: 'ERROR'
                    })
                }
            })
            .catch((error) => {
                res.send(error.message)
            })
    },
    deleteOrders: (req, res) => {
        const inv = req.params.inv
        modelDeleteOrders(inv)
            .then((response) => {
                if (response.affectedRows != 0) {
                    res.json({
                        message: 'Orders Deleted!',
                        status: 'OK'
                    })
                } else {
                    res.json({
                        message: 'Nothing Deleted!',
                        status: 'ERROR'
                    })
                }
            })
            .catch((error) => {
                res.send(error.message)
            })
    },
    postOrders: (req, res) => {
        const data = req.body
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
    },
    deleteOrdersDtl: (req, res) => {
        const id = req.query.id
        modelDeleteDetails(id)
            .then((response) => {
                if (response.affectedRows != 0) {
                    res.json({
                        message: 'Item Deleted from Order!',
                        status: 'OK'
                    })
                } else {
                    res.json({
                        message: 'Nothing Deleted!',
                        status: 'ERROR'
                    })
                }
            })
            .catch((error) => {
                res.send(error)
            })
    },
    updateOrdersDtl: (req, res) => {
        const data = req.body
        const id = req.params.id
        modelUpdateDetails(data, id)
            .then(() => {
                res.json({
                    message: 'Item Updated!',
                    status: 'OK'
                })
            })
            .catch((error) => {
                res.send(error)
            })
    }

}