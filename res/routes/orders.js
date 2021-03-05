// Tambahkan Route dari Express
const express = require('express')
const route = express.Router()
const {authentication, authorizeAdmin, authorizeCashier} = require('../helpers/middleware/auth')
// Ambil Method dari Controller Orders
const {
    getAllOrders,
    getDetailOrders,
    deleteOrders,
    postOrders,
    updateOrdersDtl
} = require('../controllers/orders')

const { getRedisOrders } = require('../helpers/redis/orders')
// Atur route orders
route
    .get('/api/orders', authentication, getRedisOrders, getAllOrders)           //Admin&cashier
    .get('/api/orders/:inv',authentication, getDetailOrders)                    //Admin&cashier
    .delete(`/api/orders/:inv`,authentication, authorizeAdmin, deleteOrders)    //Admin
    .post('/api/orders', authentication, authorizeCashier, postOrders)          //Cashier
    .patch('/api/orders/:id',authentication, authorizeAdmin, updateOrdersDtl)   //Admin

module.exports = route