// Tambahkan Express ke Project
const express = require('express')
const app = express()

// Tambahkan Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// Tambahkan Route yang sudah dikonfigurasi
const route = require('./res/routes/menus')
app.use(route)

// Atur Port
const port = 3000
// Konfigurasi listen port
app.listen(port, () => {
    console.log(`Application is Started on localhost:${port}`)
})