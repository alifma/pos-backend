// Model Menus
const {
    modelAllMenus,
    modelDetailMenus,
    modelAddMenus,
    modelDeleteMenus,
    modelUpdateMenus,
    modelPatchMenus,
    modelTotalMenus,
    modelTotalResult,
} = require('../models/menus')

// MomentJS
const moment = require('moment');

// Response Helper 
const {
    error,
    success
} = require('../helpers/response')

module.exports = {
    // Tampilkan Semua Menu yang aktif
    getAllMenus: async (req, res) => {
        try {
            // Ambil Query dari URL
            const name = req.query.name ? req.query.name : ''
            const limit = req.query.limit ? req.query.limit : '9'
            const page = req.query.page ? req.query.page : '1'
            const offset = page === 1 ? 0 : (page - 1) * limit
            const orderby = req.query.order ? req.query.order : 'id'
            const sort = req.query.sort ? req.query.sort : 'ASC'
            // Ambil dari Modal pakai Await
            const total = await modelTotalMenus()
            const totalResult = await modelTotalResult(name)
            modelAllMenus(name, offset, limit, orderby, sort)
                .then((response) => {
                    if (response.length != 0) {
                        const arr = response.map(i => ({
                            ...i,
                            isClicked: false
                        }))
                        const pagination = {
                            page: page,
                            limit: limit,
                            // Semua menu yang aktif
                            totalMenus: total[0].total,
                            // Semua menu yang Sesuai Query
                            totalResult: totalResult[0].total,
                            // Jumlah Page yang Sesuai Query
                            pageResult: Math.ceil(totalResult[0].total / limit),
                        }
                        // Kalau arraynya ada isinya
                        success(res, 200, 'Display Menu Success', pagination, arr)
                    } else {
                        // Kalau arraynya kosong
                        error(res, 400, 'No data on this page', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau ada problem dari query nya
                    error(res, 400, `Wrong Query Given, ${err.message}`, {}, {})
                })
        } catch (err) {
            // Kalau ada masalah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }
    },

    // Tampilkan detail dari sebuah menu
    getDetailMenus: (req, res) => {
        try {
            // Ambil params, params itu yang ada di link
            const id = req.params.id
            modelDetailMenus(id)
                .then((response) => {
                    if (response.length != 0) {
                        // Kalau responsenya gak kosong
                        success(res, 200, 'Display Detail Menu Success', {}, response)
                    } else {
                        // Kalau responsenya kosong
                        error(res, 400, 'Data Not Found, Wrong ID', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau Tipe ID Salah 
                    error(res, 400, `Wrong Parameter Type Given, ${err.message}`, {}, {})
                })
        } catch (err) {
            // Kalau ada masalah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }


    },

    // Tambahkan Menu baru
    addMenus: (req, res) => {
        try {
            const data = req.body
            if (data.image && data.category_id && data.price && data.name) {
                modelAddMenus(data)
                    .then(() => {
                        // Kalau berhasil menambahkan data
                        success(res, 200, 'Add Menu Success', {}, {})
                    })
                    .catch((err) => {
                        // Kalau tipe data ada yang salah
                        error(res, 400, `Wrong Data Type Given, ${err.message}`, {}, {})
                    })
            } else {
                // Kalau ada data yang kosong
                error(res, 400, 'Please fill all field!', {}, {})
            }
        } catch (err) {
            // Kalau ada masalah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }

    },

    // Softdelete Menu
    deleteMenus: (req, res) => {
        try {
            const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
            const id = req.params.id
            modelDeleteMenus(id, currDate)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau ada yang terhapus
                        success(res, 200, 'Delete Menu Success', {}, {})
                    } else {
                        // Kalau tidak ada  yang terhapus karena salah ID
                        error(res, 400, 'Nothing deleted, Wrong ID!', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau Tipe ID Salah 
                    error(res, 400, `Wrong Parameter Type Given, ${err.message}`, {}, {})
                })
        } catch (err) {
            // Kalau ada masalah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }
    },

    // Perbarui Menu(Keseluruhan)
    updateMenus: (req, res) => {
        try {
            const id = req.params.id
            const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
            const data = {
                ...req.body,
                'updated_at': currDate
            }
            if (data.image && data.category_id && data.price && data.name) {
                modelUpdateMenus(data, id)
                    .then((response) => {
                        if (response.affectedRows != 0) {
                            // Kalau berhasil mengupdate
                            success(res, 200, 'Update Menu Success', {}, {})
                        } else {
                            // Kalau tidak ada yang terupdate
                            error(res, 400, 'Nothing Updated, Wrong ID', {}, {})
                        }
                    })
                    .catch((err) => {
                        // Kalau tipe data ada yang salah
                        error(res, 400, `Wrong Data Type Given, ${err.message}`, {}, {})
                    })
            } else {
                // Kalau ada data yang kosong
                error(res, 400, 'Please Fill All Field!', {}, {})
            }
        } catch (err) {
            // Kalau ada masalah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }
    },

    // Perbarui Menu (Beberapa Kolom)
    patchMenus: (req, res) => {
        try {
            const id = req.params.id
            const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
            const data = {
                ...req.body,
                'updated_at': currDate
            }
            modelPatchMenus(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau ada data yang terupdate
                        success(res, 200, 'Patch Menu Success', {}, {})
                    } else {
                        // Kalau tidak ada data yang berubah
                        error(res, 400, 'Nothing Patched, Wrong ID', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau tipe data ada yang salah
                    error(res, 400, `Wrong Data Type Given, ${err.message}`, {}, {})
                })
        } catch (error) {
            // Kalau ada masalah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }
    }
}