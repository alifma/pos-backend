// Panggil koneksi database
const connection = require('../config/database')

// Export setiap methodnya
module.exports = {
    // Tangkap Semua data untuk Redist
    modelRedisMenus: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM t_menu`, (error, result)=>{
                if (error) {
                    reject(new Error(error))
                }else{
                    resolve(result)
                }
            })
        })
    },
    
    // Tampilkan Semua Menu Yang Aktif
    modelAllMenus: (name, offset, limit, orderby, sort, status) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT t_menu.id,t_menu.name as name, t_category.name as category,t_menu.price, t_menu.image, t_menu.created_at FROM t_menu LEFT JOIN t_category ON t_menu.category_id = t_category.id WHERE t_menu.name LIKE '%${name}%' && t_menu.isReady='${status}' ORDER BY t_menu.${orderby}  ${sort} LIMIT ${offset}, ${limit}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    // Tampilkan Detail menu
    modelDetailMenus: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT t_menu.id, t_menu.name as name, t_category.name as category, t_menu.category_id,t_menu.price, t_menu.image, t_menu.isReady,t_menu.created_at, t_menu.updated_at
            FROM t_menu LEFT JOIN t_category ON t_menu.category_id = t_category.id WHERE t_menu.id=${id}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    // Tambah Menu Baru
    modelAddMenus: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO t_menu (name, price, image, category_id)
            VALUES ("${data.name}", '${data.price}', '${data.image}', '${data.category_id}')`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    // Delete Menu
    modelDeleteMenus: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM t_menu WHERE id='${id}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    // Perbarui Menu (Keseluruhan)
    modelUpdateMenus: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE t_menu SET name="${data.name}", price='${data.price}', image='${data.image}', category_id='${data.category_id}', updated_at='${data.updated_at}' WHERE id = '${id}'`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },

    // Perbarui Menu (Beberapa Kolom)
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
    },

    // Total Menu Aktif
    modelTotalMenus: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(id) as total FROM t_menu WHERE isReady=1`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    // Total Menu Sesuai Query
    modelTotalResult: (name) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(id) as total FROM t_menu WHERE name LIKE '%${name}%' AND isReady=1`,
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