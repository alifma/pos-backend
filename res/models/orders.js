// Panggil koneksi database
const connection = require('../config/database')

// Eksport Semua Method
module.exports = {
    
    // Lempar Data Orders ke Redis
    modelRedisOrders: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT MIN(t_order_head.inv) as inv, t_order_head.created_at, t_order_head.cashier, GROUP_CONCAT(' ',t_order.menu,' x ',t_order.amount) as orders , t_order_head.total as total, t_order_head.total * 0.1 as ppn
            FROM t_order_head LEFT JOIN t_order ON t_order_head.inv = t_order.inv 
            GROUP BY t_order_head.inv`, (error, result) => {
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
            let sql = ''
            if (range == 'DAY' || range == 'day') {
                sql = `SELECT MIN(t_order_head.inv) AS inv, t_order_head.created_at, t_order_head.cashier, GROUP_CONCAT(' ',t_order.menu,' x ',t_order.amount) as orders , t_order_head.total as total, t_order_head.total * 0.1 as ppn
                FROM t_order_head LEFT JOIN t_order ON t_order_head.inv = t_order.inv WHERE CAST(t_order_head.created_at AS DATE) = CURDATE() GROUP BY t_order_head.inv ORDER BY t_order_head.created_at ${sort} LIMIT ${offset}, ${limit}`
            }else{
                sql = `SELECT MIN(t_order_head.inv) AS inv, t_order_head.created_at, t_order_head.cashier, GROUP_CONCAT(' ',t_order.menu,' x ',t_order.amount) as orders , t_order_head.total as total, t_order_head.total * 0.1 as ppn
                FROM t_order_head LEFT JOIN t_order ON t_order_head.inv = t_order.inv WHERE t_order_head.created_at BETWEEN date_sub(now(),INTERVAL 1 ${range}) and now() 
                GROUP BY t_order_head.inv ORDER BY t_order_head.created_at ${sort} LIMIT ${offset}, ${limit}`
            }
            connection.query(sql, (error, result) => {
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
            connection.query(`SELECT id, inv, cashier,menu, amount, price, price*amount as total, created_at FROM t_order WHERE inv = ${inv}`, (error, result) => {
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
            connection.query(`DELETE t_order, t_order_head FROM t_order_head INNER JOIN t_order 
            WHERE t_order.inv=${inv} AND t_order_head.inv=${inv}`, (error, result) => {
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
            let sql = data.map(item => `('${item.inv}', '${item.cashier}', '${item.menu}', ${item.amount}, ${item.price})`)
            connection.query(`INSERT INTO t_order (inv, cashier, menu, amount, price) VALUES ${sql}`,
                (error, result) => {
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve(result)
                    }
                })
        })
    },

    // Tambahkan Head Order Baru
    modelPostHeadOrder: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO t_order_head (inv, cashier, total) VALUE (${data.inv}, "${data.cashier}", ${data.total})`,
                (error, result) => {
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
            connection.query(`SELECT COUNT(inv) as total FROM t_order_head WHERE created_at BETWEEN date_sub(now(),INTERVAL 1 ${range}) and now()`,
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
            connection.query(`SELECT sum(total) as totalIncome FROM t_order_head`,
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
            let sql = ''
            if(range == 'DAY' || 'day'){
                sql = `SELECT SUM(total) as totalIncome FROM t_order_head WHERE CAST(t_order_head.created_at AS DATE) = CURDATE()`
            }else{
                sql = `SELECT sum(total) as totalIncome FROM t_order_head WHERE created_at BETWEEN date_sub(now(),INTERVAL 1 ${range}) and now()`
            }
            connection.query(sql,
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
            connection.query(`SELECT sum(total) as yesterdayIncome FROM t_order_head WHERE DATE(created_at) < CURDATE() && DATE(created_at) > CURRENT_DATE - 2`,
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
    modelTotalLastWeek: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(DISTINCT inv) as total FROM t_order_head WHERE DATE(created_at) < CURDATE()-7 && DATE(created_at) > CURRENT_DATE - 14`,
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