// Tambahkan Route dari Express
const express = require('express')
const route = express.Router()

// Ambil Method dari Controller
const {
    getAllMenus
} = require('../controllers/menus')

// Atur route tiap halaman
route
    .get('/menus', getAllMenus)

module.exports = route