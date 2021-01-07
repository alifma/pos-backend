// Tambahkan Route dari Express
const express = require('express')
const route = express.Router()
// Ambil Method dari Controller Orders
const {
    getAllOrders,
    getDetailOrders,
    deleteOrders,
    postOrders
} = require('../controllers/orders')

// Atur route orders
route
    .get('/orders', getAllOrders)
    .get('/orders/:inv', getDetailOrders)
    .delete(`/orders/:inv`, deleteOrders)
    .post('/orders', postOrders)

module.exports = route