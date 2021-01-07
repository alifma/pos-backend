// Tambahkan Express ke Project
const express = require('express')
const app = express()

// Tambahkan Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Tambahkan Route yang sudah dikonfigurasi
const routeMenu = require('./res/routes/menus')
app.use(routeMenu)
// Tambahkan Route yang sudah dikonfigurasi
const routeOrder = require('./res/routes/orders')
app.use(routeOrder)

// Atur Port
const port = 3000
// Konfigurasi listen port
app.listen(port, () => {
    console.log(`Application is Started on localhost:${port}`)
})