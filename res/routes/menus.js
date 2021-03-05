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

// Redis Methods
const {getRedisMenus} = require('../helpers/redis/menus')

// Auth & Authorize
const {authentication, authorizeAdmin} = require('../helpers/middleware/auth')

// Upload File
const {singleUpload} = require('../helpers/middleware/upload')

// Atur route menus
route
    .get('/api/menus', authentication, getRedisMenus, getAllMenus)                          //Admin & Cashier
        .get('/api/menus/:id', authentication, getDetailMenus)                              //Admin & Cashier
        .post('/api/menus', authentication, authorizeAdmin, singleUpload, addMenus)         //Admin
        .delete('/api/menus/:id', authentication, authorizeAdmin, deleteMenus)              //Admin
        .put('/api/menus/:id', authentication, authorizeAdmin, singleUpload, updateMenus)   //Admin
        .patch('/api/menus/:id', authentication, authorizeAdmin, singleUpload, patchMenus)  //Admin

// Exports Modules
module.exports = route