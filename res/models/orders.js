// Panggil koneksi database
const connection = require('../config/database')
module.exports = {
    // Tampilkan Semua Transaksi
    modelAllOrders: (offset, limit, sort) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT t_order.inv, t_order.cashier, t_order.created_at, 
                GROUP_CONCAT(' ',t_menu.name,' x ',t_order.amount) as orders , sum(t_order.amount * t_menu.price) as total 
                FROM t_order LEFT JOIN t_menu ON t_order.menu_id = t_menu.id GROUP BY inv ${sort} LIMIT ${offset}, ${limit}`, (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    modelDetailOrders: (inv) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT t_order.id as order_id, t_menu.name, t_order.amount, t_menu.price, t_menu.price*t_order.amount as total 
            FROM t_order LEFT JOIN t_menu ON t_order.menu_id = t_menu.id 
            WHERE t_order.inv = ${inv}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    modelDeleteOrders: (inv) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM t_order WHERE inv=${inv}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    modelPostOrders: (data) => {
        return new Promise((resolve, reject) => {
            let sql = data.map(item => `('${item.inv}', '${item.cashier}', ${item.menu_id}, ${item.amount})`)
            connection.query(`INSERT INTO t_order (inv, cashier, menu_id, amount) VALUES ${sql}`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    modelDeleteDetails: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM t_order WHERE id='${id}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    modelUpdateDetails: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE t_order SET ? WHERE id=?`, [data, id],
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