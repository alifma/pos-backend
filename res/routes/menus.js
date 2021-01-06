// Tambahkan Route dari Express
const express = require('express')
const route = express.Router()

// Ambil Method dari Controller
const {
    getAllMenus,
    getDetailMenus,
    addMenus,
    deleteMenus,
    updateMenus,
    patchMenus
} = require('../controllers/menus')

// Atur route tiap halaman
route
    .get('/menus', getAllMenus)
    .get('/menus/:id', getDetailMenus)
    .post('/menus', addMenus)
    .delete('/menus/:id', deleteMenus)
    .put('/menus/:id', updateMenus)
    .patch('/menus/:id', patchMenus)

module.exports = route