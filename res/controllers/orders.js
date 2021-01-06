const {
    query
} =
require('../config/database')
const {
    modelAllOrders,
    modelDetailOrders,
    modelDeleteOrders,
    modelPostOrders
} = require('../models/orders')


module.exports = {
    getAllOrders: (req, res) => {
        modelAllOrders()
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
            .then((response) => {
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
            .then((response) => {
                res.json({
                    status: 'Ok'
                })
            })
            .catch((error) => {
                res.send(error)
            })
    }
}