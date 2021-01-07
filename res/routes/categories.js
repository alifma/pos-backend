// Tambahkan Route dari Express
const express = require('express')
const route = express.Router()

// Ambil Method dari Controller Categories
const {
    getAllCtgry,
    getDetailCtgry,
    deleteCtgry,
    addCtgry,
    updateCtgry
} = require('../controllers/categories')

// Atur route menus
route
    .get('/categories', getAllCtgry)
    .get('/categories/:id', getDetailCtgry)
    .delete('/categories/:id', deleteCtgry)
    .post('/categories', addCtgry)
    .put('/categories/:id', updateCtgry)

module.exports = route