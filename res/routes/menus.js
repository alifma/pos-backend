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

const {authentication, authorizeAdmin, authorizeCashier} = require('../helpers/middleware/auth')

// Atur route menus
route
    .get('/menus', authentication, authorizeAdmin, getAllMenus)
    .get('/menus/:id', authentication, authorizeCashier, getDetailMenus)
    .post('/menus', authentication, addMenus)
    .delete('/menus/:id', authentication, deleteMenus)
    .put('/menus/:id', authentication, updateMenus)
    .patch('/menus/:id', authentication, patchMenus)

module.exports = route