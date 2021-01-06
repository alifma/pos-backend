// Tambahkan Express ke Project
const express = require('express')
const app = express()
// Atur Port
const port = 3000


app.listen(port, () => {
    console.log(`Application is Started on localhost:${port}`)
})