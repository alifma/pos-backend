// Panggil koneksi database
const connection = require('../config/database')
// Export setiap methodnya
module.exports = {
    modelAllCtgry: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM t_category`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
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