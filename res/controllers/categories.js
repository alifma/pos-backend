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
    getAllCtgry: (req, res) => {
        modelAllCtgry()
            .then((response) => {
                success(res, "Show All Category Success", {}, response)
            })
            .catch((err) => {
                error(res, `Server Side Error ${err.message}`, {}, {})
            })
    },

    // Tampilkan Detail Kategori
    getDetailCtgry: (req, res) => {
        const id = req.params.id
        if (isNaN(id)) {
            error(res, "Wrong ID Type", {}, {})
        } else {
            modelDetailCtgry(id)
                .then((response) => {
                    if (response.length != 0) {
                        success(res, "Show Detail Category Success", {}, response)
                    } else {
                        error(res, "Data Not Found, Wrong ID", {}, {})
                    }
                })
                .catch((err) => {
                    error(res, `Server Side Error ${err.message}`, {}, {})
                })
        }
    },

    // SoftDelete Kategori
    deleteCtgry: (req, res) => {
        const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
        const id = req.params.id
        if (isNaN(id)) {
            error(res, "Wrong ID Type", {}, {})
        } else {
            modelDeleteCtgry(id, currDate)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        success(res, "Delete Category Success", {}, {})
                    } else {
                        error(res, "Nothing Deleted, Wrong ID", {}, {})
                    }
                })
                .catch((err) => {
                    error(res, `Server Side Error ${err.message}`, {}, {})
                })
        }
    },

    // Tambah Kategori Baru
    addCtgry: (req, res) => {
        const data = req.body
        if (data.length != 0) {
            modelAddCtgry(data)
                .then(() => {
                    success(res, "Add Category Success", {}, {})
                })
                .catch((err) => {
                    error(res, `Server Side Error ${err.message}`, {}, {})
                })
        } else {
            error(res, "Every field shouldn't empty", {}, {})
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
                        success(res, "Update Category Success", {}, {})
                    } else {
                        error(res, "Nothing Updated, Wrong ID", {}, {})
                    }
                })
                .catch((err) => {
                    error(res, `Server Side Error ${err.message}`, {}, {})
                })
        } else {
            error(res, "Every field shouldn't empty", {}, {})
        }
    }

}