// Model Menus
const {
    modelAllMenus,
    modelDetailMenus,
    modelAddMenus,
    modelDeleteMenus,
    modelUpdateMenus,
    modelPatchMenus,
    modelTotalMenus,
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
        const name = req.query.name ? req.query.name : ''
        const limit = req.query.limit ? req.query.limit : '9'
        const page = req.query.page ? req.query.page : '1'
        const offset = page === 1 ? 0 : (page - 1) * limit
        const orderby = req.query.order ? req.query.order : 'id'
        const sort = req.query.sort ? req.query.sort : 'ASC'
        const availOrder = ['name', 'price', 'id', 'created_at', 'category_id']
        const availSort = ['asc', 'desc']
        const total = await modelTotalMenus()
        if (isNaN(page) || isNaN(limit) || availOrder.includes(orderby) == false || availSort.includes(sort.toLowerCase()) == false) {
            error(res, 'Wrong Parameter Type', {}, {})
        } else {
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
                            totalMenus: total[0].total,
                            totalPage: Math.ceil(total[0].total / limit),
                        }
                        success(res, 'Successfully Display All Menu', pagination, arr)
                    } else {
                        error(res, 'No data on this page', {}, {})
                    }
                })
                .catch((err) => {
                    error(res, `Server Side Error ${err.message}`, {}, {})
                })
        }
    },

    // Tampilkan detail dari sebuah menu
    getDetailMenus: (req, res) => {
        // Ambil params, params itu yang ada di link
        const id = req.params.id
        if (isNaN(id)) {
            error(res, 'Wrong ID Type', {}, {})
        } else {
            modelDetailMenus(id)
                .then((response) => {
                    if (response.length != 0) {
                        success(res, 'Successfully Display Detail Menu', {}, response)
                    } else {
                        error(res, 'Data Not Found, Wrong ID', {}, {})
                    }
                })
                .catch((err) => {
                    error(res, `Server Side Error ${err.message}`, {}, {})
                })
        }
    },

    // Tambahkan Menu baru
    addMenus: (req, res) => {
        const data = req.body
        if (data.image || data.length == 0) {
            modelAddMenus(data)
                .then(() => {
                    success(res, 'Add Menu Successfull', {}, {})
                })
                .catch((err) => {
                    error(res, `Server Side Error ${err.message}`, {}, {})
                })
        } else {
            error(res, 'Please fill all field!', {}, {})
        }

    },

    // Softdelete Menu
    deleteMenus: (req, res) => {
        const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
        const id = req.params.id
        if (isNaN(id)) {
            error(res, 'Wrong ID Type', {}, {})
        } else {
            modelDeleteMenus(id, currDate)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        success(res, 'Delete Menu Successfull', {}, {})
                    } else {
                        error(res, 'Nothing deleted, Wrong ID!', {}, {})
                    }
                })
                .catch(() => {
                    error(res, 'Data is used on some transaction', {}, {})
                })
        }
    },

    // Perbarui Menu(Keseluruhan)
    updateMenus: (req, res) => {
        const id = req.params.id
        const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
        const data = {
            ...req.body,
            'updated_at': currDate
        }
        if (isNaN(id)) {
            error(res, 'Wrong ID Type', {}, {})
        } else if (data.image || data.length == 0) {
            modelUpdateMenus(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        success(res, 'Delete Menu Successfull', {}, {})
                    } else {
                        error(res, 'Nothing Updated, Wrong ID!', {}, {})
                    }
                })
                .catch((err) => {
                    error(res, `Server Side Error ${err.message}`, {}, {})
                })
        } else {
            error(res, 'Please Fill All Field!', {}, {})
        }
    },

    // Perbarui Menu (Beberapa Kolom)
    patchMenus: (req, res) => {
        const id = req.params.id
        const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
        const data = {
            ...req.body,
            'updated_at': currDate
        }
        if (isNaN(id)) {
            error(res, 'Wrong ID Type', {}, {})
        } else {
            modelPatchMenus(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        success(res, '', {}, {})
                    } else {
                        error(res, 'Nothing Patched, Wrong ID!', {}, {})
                    }
                })
                .catch((err) => {
                    error(res, `Server Side Error ${err.message}`, {}, {})
                })
        }
    }

}