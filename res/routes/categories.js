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
    .get('/api/categories', authentication, getRedisCtgry, getAllCtgry)         //Admin & Cashier
    .get('/api/categories/:id', authentication, getDetailCtgry)                 //Admin & Cashier
    .delete('/api/categories/:id', authentication, authorizeAdmin, deleteCtgry) //Admin
    .post('/api/categories', authentication, authorizeAdmin, addCtgry)          //Admin
    .patch('/api/categories/:id', authentication, authorizeAdmin, updateCtgry)  //Admin

module.exports = route