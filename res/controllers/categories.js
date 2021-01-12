// Model Category
const {
    modelAllCtgry,
    modelDetailCtgry,
    modelDeleteCtgry,
    modelAddCtgry,
    modelUpdateCtgry
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
        modelAllCtgry()
            .then((response) => {
                success(res, 200, "Show All Category Success", totalCategory, response)
            })
            .catch((err) => {
                error(res, 500, `Server Side Error, ${err.message}`, {}, {})
            })
    },

    // Tampilkan Detail Kategori
    getDetailCtgry: (req, res) => {
        const id = req.params.id
        // Jika tipe ID Salah
        if (isNaN(id)) {
            error(res, 400, "Wrong ID Type", {}, {})
        } else {
            modelDetailCtgry(id)
                .then((response) => {
                    if (response.length != 0) {
                        // Jika Hasilnya ada
                        success(res, 200, "Show Detail Category Success", {}, response)
                    } else {
                        // Jika tidak ada hasilnya
                        error(res, 404, "Data Not Found, Wrong ID", {}, {})
                    }
                })
                .catch((err) => {
                    // Jika dari model tidak bisa display
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    },

    // SoftDelete Kategori
    deleteCtgry: (req, res) => {
        const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
        const id = req.params.id
        // Jika tipe ID salah
        if (isNaN(id)) {
            error(res, "Wrong ID Type", {}, {})
        } else {
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
                    // Kalau dari model gagal display data
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    },

    // Tambah Kategori Baru
    addCtgry: (req, res) => {
        const data = req.body
        if (data.length != 0) {
            modelAddCtgry(data)
                .then(() => {
                    // Jika tambah data sukses
                    success(res, 201, "Add Category Success", {}, {})
                })
                .catch((err) => {
                    // Jika tambah data di modelnya gagal
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        } else {
            // Jika inputnya kosong
            error(res, 400, "Every field shouldn't empty", {}, {})
        }
    },

    // Perbarui Kategori
    updateCtgry: (req, res) => {
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
                        success(res, 201, "Update Category Success", {}, {})
                    } else {
                        // Jikka tidak ada yang terupdate
                        error(res, 400, "Nothing Updated, Wrong ID", {}, {})
                    }
                })
                .catch((err) => {
                    // Jika ada problem dari modelnya
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        } else {
            // Jika inputnya kosong
            error(res, 400, "Every field shouldn't empty", {}, {})
        }
    }

}