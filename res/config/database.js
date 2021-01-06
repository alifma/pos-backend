// Koneksi Ke Database
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'posvue'
})
// Export agar bisa digunakan di models
module.exports = connection