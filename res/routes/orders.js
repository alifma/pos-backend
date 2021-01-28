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
    deleteOrdersDtl,
    updateOrdersDtl
} = require('../controllers/orders')

const { getRedisOrders } = require('../helpers/redis/orders')
// Atur route orders
route
    .get('/orders', authentication, getRedisOrders, getAllOrders)           //Admin&cashier
    .get('/orders/:inv',authentication,  authorizeAdmin, getDetailOrders)   //Admin
    .delete(`/orders/:inv`,authentication, authorizeAdmin, deleteOrders)    //Admin
    .post('/orders', authentication, authorizeCashier, postOrders)          //Cashier
    .delete('/orders',authentication, authorizeAdmin, deleteOrdersDtl)      //Admin
    .patch('/orders/:id',authentication, authorizeAdmin, updateOrdersDtl)   //Admin

module.exports = route