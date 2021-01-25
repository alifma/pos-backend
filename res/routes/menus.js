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

const {authentication, authorizeAdmin} = require('../helpers/middleware/auth')

// Atur route menus
route
    .get('/menus', authentication, getAllMenus)                         //Admin & Cashier
    .get('/menus/:id', authentication, getDetailMenus)                  //Admin & Cashier
    .post('/menus', authentication,authorizeAdmin, addMenus)            //Admin
    .delete('/menus/:id', authentication, authorizeAdmin, deleteMenus)  //Admin
    .put('/menus/:id', authentication,authorizeAdmin, updateMenus)      //Admin
    .patch('/menus/:id', authentication, authorizeAdmin,patchMenus)     //Admin

module.exports = route