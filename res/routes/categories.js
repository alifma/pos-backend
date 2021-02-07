// Tambahkan Route dari Express
const express = require('express')
const route = express.Router()
const {authentication, authorizeAdmin} = require('../helpers/middleware/auth')

// Ambil Method dari Controller Categories
const {
    getAllCtgry,
    getDetailCtgry,
    deleteCtgry,
    addCtgry,
    updateCtgry
} = require('../controllers/categories')

// Ambil dari Redis
const {getRedisCtgry} = require('../helpers/redis/categories')

// Atur route menus
route
    .get('/categories', authentication, getRedisCtgry, getAllCtgry)         //Admin & Cashier
    .get('/categories/:id', authentication, getDetailCtgry)                 //Admin & Cashier
    .delete('/categories/:id', authentication, authorizeAdmin, deleteCtgry) //Admin
    .post('/categories', authentication, authorizeAdmin, addCtgry)          //Admin
    .patch('/categories/:id', authentication, authorizeAdmin, updateCtgry)  //Admin

module.exports = route