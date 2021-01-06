// Tambahkan Express ke Project
const express = require('express')
const app = express()
// Atur Port
const port = 3000

app.get('/', (req, res) => {
    const json = [{
            id: 10,
            name: 'Alifma'
        },
        {
            id: 11,
            name: 'Maulana'
        }
    ]
    res.json(json)
})

// Koneksi ke Mysql
const mysql = require('mysql2')

// Koneksi DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'posvue'
})

// Display all Menus
app.get('/menus', (req, res) => {
    connection.query('SELECT * FROM t_menu', (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json(result)
        }
    })
})


app.listen(port, () => {
    console.log(`Application is Started on localhost:${port}`)
})