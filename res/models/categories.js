// Panggil koneksi database
const connection = require('../config/database')

// Export setiap methodnya
module.exports = {
    // Tangkap Semua Kategori untuk Redis
    modelRedisCtgry: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * from t_category`, (error, result) => {
                if (error) {
                    module.exports.setRedisCtgry()
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    // Tampilkan Semua Kategori
    modelAllCtgry: (status) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT t_category.id, t_category.name, count(t_menu.id) as count, t_category.created_at, t_category.updated_at FROM t_category LEFT JOIN t_menu ON t_category.id = t_menu.category_ID WHERE t_category.isReady LIKE '${status}' GROUP BY t_category.id`, (error, result) => {
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

    // Delete Kategori
    modelDeleteCtgry: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM t_category WHERE id = ${id}`, (error, result) => {
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
    },

    // Total Menu
    modelTotalCtgry: (status) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(id) as total FROM t_category WHERE isReady LIKE '%${status}%'`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    }
}