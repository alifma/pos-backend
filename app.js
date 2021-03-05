// Tambahkan Express ke Project
const express = require('express')
const app = express()

// History Router
const history = require('connect-history-api-fallback')

// DotEnv
const {
    PORT
} = require('./res/helpers/env')

// CORS
const cors = require('cors')

// Tambahkan Body Parser
const bodyParser = require('body-parser')

// Definisikan Route yang sudah dikonfigurasi
const routeMenu = require('./res/routes/menus')
const routeOrder = require('./res/routes/orders')
const routeCtgry = require('./res/routes/categories')
const routeUsers = require('./res/routes/users')

// Definsiikan response notFound
const {
    notFound
} = require('./res/helpers/response')

// Menggunakan CORS
app.use(cors())

// Konfigurasi Body Parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Menggunakan Route yang sudah didefinisikan
app.use(routeMenu)
app.use(routeOrder)
app.use(routeCtgry)
app.use(routeUsers)

// Image Path
app.use('/img', express.static('./public/img'))

// app.use(history({
//   verbose: true
// }))

// // Deploy FrontEndPath
// app.use('/', express.static('./dist'))

// Konfigurasi listen port
app.listen(PORT, () => {
    console.log(`Application is Started on localhost:${PORT}`)
})