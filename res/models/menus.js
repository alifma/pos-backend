// Panggil koneksi database
const connection = require('../config/database')
// Export setiap methodnya
module.exports = {
    // Tampilkan Semua Menu
    modelAllMenus: (name, offset, limit, orderby, sort) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM t_menu WHERE name LIKE '%${name}%' && isReady=1 ORDER BY ${orderby}  ${sort} LIMIT ${offset}, ${limit}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    // Display Detail menu
    modelDetailMenus: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM t_menu WHERE id=${id}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    // Tambah Menu
    modelAddMenus: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO t_menu (name, price, image, category_id)
            VALUES ('${data.name}', '${data.price}', '${data.image}', '${data.category_id}')`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    // Hapus Menu
    modelDeleteMenus: (id, currDate) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE t_menu SET isReady=0, updated_at='${currDate}' WHERE id=${id}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    // Update Menu
    modelUpdateMenus: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE t_menu SET name='${data.name}', price='${data.price}', image='${data.image}', category_id='${data.category_id}', updated_at='${data.updated_at}' WHERE id = '${id}'`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    // Patch Menu
    modelPatchMenus: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE t_menu SET ? WHERE id=?`, [data, id],
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