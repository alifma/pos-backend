// Tambahkan Route dari Express
const express = require('express')
const route = express.Router()

// Ambil Method dari Controller Menus
const {
    getAllMenus,
    getDetailMenus,
    addMenus,
    deleteMenus,
    softDeleteMenus,
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
    .get('/menus', authentication, getRedisMenus, getAllMenus)                          //Admin & Cashier
        .get('/menus/:id', authentication, getDetailMenus)                              //Admin & Cashier
        .post('/menus', authentication, authorizeAdmin, singleUpload, addMenus)         //Admin
        .delete('/menus-s/:id', authentication, authorizeAdmin, softDeleteMenus)          //Admin
        .delete('/menus/:id', authentication, authorizeAdmin, deleteMenus)              //Admin
        .put('/menus/:id', authentication, authorizeAdmin, singleUpload, updateMenus)   //Admin
        .patch('/menus/:id', authentication, authorizeAdmin, singleUpload, patchMenus)  //Admin

// Exports Modules
module.exports = route