// Panggil koneksi database
const connection = require('../config/database')

// Export setiap methodnya
module.exports = {

    // Tampilkan Semua Kategori
    modelAllCtgry: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM t_category WHERE isReady=1`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    // Tampilkan Detail Kategori
    modelDetailCtgry: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM t_category WHERE id = ${id}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    // Softdelete Kategori
    modelDeleteCtgry: (id, currDate) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE t_category SET isReady=0, updated_at='${currDate}' WHERE id = ${id}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    // Tambahkan Kategori Baru
    modelAddCtgry: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO t_category (name) VALUES ('${data.name}')`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    // Perbarui Kategori
    modelUpdateCtgry: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE t_category SET ? WHERE id=?`, [data, id], (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }

}