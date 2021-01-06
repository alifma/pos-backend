// Panggil koneksi database
const connection = require('../config/database')
// Export setiap methodnya
module.exports = {
    // Tampilkan Semua Menu
    modelAllMenus: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM t_menu', (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }
}