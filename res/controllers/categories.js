// Model Category
const {
    modelAllCtgry,
    modelDetailCtgry,
    modelDeleteCtgry,
    modelAddCtgry,
    modelUpdateCtgry,
    modelTotalCtgry
} = require('../models/categories')

// Moment Date
const moment = require('moment');

// Response Helper
const {
    error,
    success
} = require('../helpers/response')

// Export semua Method
module.exports = {
    // Tampilkan Semua Kategori
    getAllCtgry: async (req, res) => {
        try {
            // Ambil data dari query
            const deleteStatus = req.query.ready ? req.query.ready : 1
            // Ambil data dari Model dengan Await
            const totalCategory = await modelTotalCtgry()
            modelAllCtgry(deleteStatus)
                .then((response) => {
                    // Kalau berhasil menambahkan kategori
                    success(res, 200, "Show All Category Success", totalCategory[0], response)
                })
                .catch((err) => {
                    // Kalau Ada salah di Query
                    error(res, 400, `Wrong Query Given, ${err.message}`, {}, {})
                })
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }
    },

    // Tampilkan Detail Kategori
    getDetailCtgry: (req, res) => {
        try {
            const id = req.params.id
            modelDetailCtgry(id)
                .then((response) => {
                    if (response.length != 0) {
                        // Jika ada hasilnya
                        success(res, 200, "Show Detail Category Success", {}, response)
                    } else {
                        // Jika tidak ada hasilnya
                        error(res, 400, "Data Not Found, Wrong ID", {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau Ada salah di Query
                    error(res, 400, `Wrong Parameter Type, ${err.message}`, {}, {})
                })
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }
    },

    // SoftDelete Kategori
    deleteCtgry: (req, res) => {
        try {
            const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
            const id = req.params.id
            modelDeleteCtgry(id, currDate)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau hasilnya bukan array kosong
                        success(res, 200, "Delete Category Success", {}, {})
                    } else {
                        // Kalau hasilnya array kosong
                        error(res, 400, "Nothing Deleted, Wrong ID", {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau Ada salah di Query
                    error(res, 400, `Wrong Parameter Type, ${err.message}`, {}, {})
                })
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }
    },

    // Tambah Kategori Baru
    addCtgry: (req, res) => {
        try {
            const data = req.body
            if (data.length != 0) {
                modelAddCtgry(data)
                    .then(() => {
                        // Jika tambah data sukses
                        success(res, 200, "Add Category Success", {}, {})
                    })
                    .catch((err) => {
                        // Kalau ada tipe data yang salah
                        error(res, 400, `Wrong Data Type Given, ${err.message}`, {}, {})
                    })
            } else {
                // Jika inputnya kosong
                error(res, 400, "Every field shouldn't empty", {}, {})
            }
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }
    },

    // Perbarui Kategori
    updateCtgry: (req, res) => {
        try {
            const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
            const id = req.params.id
            const data = {
                ...req.body,
                "updated_at": currDate
            }
            if (data.length != 0) {
                modelUpdateCtgry(data, id)
                    .then((response) => {
                        if (response.affectedRows != 0) {
                            // Jika ada data terupdate
                            success(res, 200, "Update Category Success", {}, {})
                        } else {
                            // Jikka tidak ada yang terupdate
                            error(res, 400, "Nothing Updated, Wrong ID", {}, {})
                        }
                    })
                    .catch((err) => {
                        // Kalau ada tipe data yang salah
                        error(res, 400, `Wrong Data Type Given, ${err.message}`, {}, {})
                    })
            } else {
                // Jika inputnya kosong
                error(res, 400, "Every field shouldn't empty", {}, {})
            }
        } catch (err) {
            // Kalau ada salah lainnya
            error(res, 500, `Internal Server Error, ${err.message}`, {}, {})
        }
    }
}