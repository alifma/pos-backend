// Panggil koneksi database
const {
    promise
} = require('../config/database')
const connection = require('../config/database')
module.exports = {
    // Tampilkan Semua Transaksi
    modelAllOrders: () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT t_order.inv, t_order.cashier, t_order.created_at, 
                GROUP_CONCAT(t_menu.name) as orders , sum(t_order.amount * t_menu.price) as total 
                FROM t_order LEFT JOIN t_menu ON t_order.menu_id = t_menu.id GROUP BY inv`, (error, result) => {
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
            connection.query(`SELECT t_menu.name, t_order.amount, t_menu.price, t_menu.price*t_order.amount as total 
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
            connection.query(`INSERT INTO t_order (inv, cashier, menu_id, amount) VALUES ('${data.inv}','${data.cashier}','${data.menu_id}','${data.amount}')`,
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