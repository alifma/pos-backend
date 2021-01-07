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
                res.json(response)
            })
            .catch((error) => {
                res.send(error)
            })
    },
    getDetailOrders: (req, res) => {
        const inv = req.params.inv
        modelDetailOrders(inv)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.send(error)
            })
    },
    deleteOrders: (req, res) => {
        const inv = req.params.inv
        modelDeleteOrders(inv)
            .then(() => {
                res.json({
                    status: 'Deleted'
                })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    postOrders: (req, res) => {
        const data = req.body
        modelPostOrders(data)
            .then(() => {
                res.json({
                    status: 'Ok'
                })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    deleteOrdersDtl: (req, res) => {
        const id = req.query.id
        modelDeleteDetails(id)
            .then(() => {
                res.json({
                    status: 'Deleted'
                })
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
                    status: 'Updated'
                })
            })
            .catch((error) => {
                res.send(error)
            })
    }

}