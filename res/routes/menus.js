// Tambahkan Route dari Express
const express = require('express')
const route = express.Router()

// Ambil Method dari Controller Menus
const {
    getAllMenus,
    getDetailMenus,
    addMenus,
    deleteMenus,
    updateMenus,
    patchMenus
} = require('../controllers/menus')

// Ambil Method dari Controller Orders
const {
    getAllOrders,
    getDetailOrders,
    deleteOrders
} = require('../controllers/orders')

// Atur route tiap halaman
route
    .get('/menus', getAllMenus)
    .get('/menus/:id', getDetailMenus)
    .post('/menus', addMenus)
    .delete('/menus/:id', deleteMenus)
    .put('/menus/:id', updateMenus)
    .patch('/menus/:id', patchMenus)
    .get('/orders', getAllOrders)
    .get('/orders/:inv', getDetailOrders)
    .delete(`/orders/:inv`, deleteOrders)

module.exports = route