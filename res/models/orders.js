// Panggil koneksi database
const connection = require('../config/database')

// Eksport Semua Method
module.exports = {
    // Lempar Data Orders ke Redis
    modelRedisOrders: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT t_order.inv, t_order.cashier, t_order.created_at, 
            GROUP_CONCAT(' ',t_menu.name,' x ',t_order.amount) as orders , sum(t_order.amount * t_order.price)*1.1 as total 
            FROM t_order LEFT JOIN t_menu ON t_order.menu_id = t_menu.id GROUP BY t_order.inv`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    
    // Tampilkan Semua Transaksi Berdasarkan Invoice
    modelAllOrders: (offset, limit, sort, range) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT t_order.inv, t_order.cashier, t_order.created_at, 
                GROUP_CONCAT(' ',t_menu.name,' x ',t_order.amount) as orders , sum(t_order.amount * t_order.price)*1.1 as total 
                FROM t_order LEFT JOIN t_menu ON t_order.menu_id = t_menu.id WHERE t_order.created_at BETWEEN date_sub(now(),INTERVAL 1 ${range}) and now() GROUP BY t_order.inv ORDER BY t_order.created_at ${sort}  LIMIT ${offset}, ${limit}`, (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },

    // Tampilkan Detail order tiap invoices
    modelDetailOrders: (inv) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT t_order.id as order_id, t_order.inv, t_order.cashier, t_menu.name, t_order.amount, t_order.price, t_menu.price*t_order.amount as total 
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

    // Hapus Order Berdasarkan Invoice
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

    // Tambahkan Order Baru
    modelPostOrders: (data) => {
        return new Promise((resolve, reject) => {
            let sql = data.map(item => `('${item.inv}', '${item.cashier}', ${item.menu_id}, ${item.amount}, ${item.price})`)
            connection.query(`INSERT INTO t_order (inv, cashier, menu_id, amount, price) VALUES ${sql}`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },

    // Hapus Detail dari setiap invoice berdasarkan ID
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

    // Perbarui Detail dari setiap order berdasarkan ID
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
    },

    // Banyaknya Order yang Terjadi
    modelTotalOrders: (range) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(DISTINCT inv) as total FROM t_order WHERE created_at BETWEEN date_sub(now(),INTERVAL 1 ${range}) and now()`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },

    // Total Pemasukan dari Awal
    modelTotalIncome: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT sum(t_order.amount * t_order.price) as totalIncome FROM t_order LEFT JOIN t_menu ON t_order.menu_id = t_menu.id`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },

    // Total Pemasukan Sesuai Range
    modelTotalRange: (range) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT sum(t_order.amount * t_order.price) as totalIncome FROM t_order LEFT JOIN t_menu ON t_order.menu_id = t_menu.id WHERE t_order.created_at BETWEEN date_sub(now(),INTERVAL 1 ${range}) and now()`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },

    // Yesterday Income
    modelTotalYesterday: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT sum(t_order.amount * t_order.price) as yesterdayIncome FROM t_order LEFT JOIN t_menu ON t_order.menu_id = t_menu.id WHERE DATE(t_order.created_at) < CURDATE() && DATE(t_order.created_at) > CURRENT_DATE - 2`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },

    // Banyaknya Order yang Terjadi Minggu Kemarin
    modelLastWeekOrders: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(DISTINCT inv) as total FROM t_order WHERE DATE(t_order.created_at) < CURDATE()-7 && DATE(t_order.created_at) > CURRENT_DATE - 14`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },

}