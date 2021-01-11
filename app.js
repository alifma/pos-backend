// Tambahkan Express ke Project
const express = require('express')
const app = express()
// DotEnv
require('dotenv').config()
const {
    PORT
} = require('./res/helpers/env')
// CORS
const cors = require('cors')
app.use(cors())

// Tambahkan Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
// Tambahkan Route yang sudah dikonfigurasi
const routeMenu = require('./res/routes/menus')
const routeOrder = require('./res/routes/orders')
const routeCtgry = require('./res/routes/categories')

app.use(routeMenu)
app.use(routeOrder)
app.use(routeCtgry)

// Konfigurasi listen port
app.listen(PORT, () => {
    console.log(`Application is Started on localhost:${PORT}`)
})