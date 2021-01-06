// Tambahkan Express ke Project
const express = require('express')
const app = express()
// Atur Port
const port = 3000
// Tambahkan Route yang sudah dikonfigurasi
const route = require('./res/routes/menus')
app.use(route)

// Konfigurasi listen port
app.listen(port, () => {
    console.log(`Application is Started on localhost:${port}`)
})