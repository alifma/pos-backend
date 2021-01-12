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
        const total = await modelTotalMenus()
        // Available Value
        const availOrder = ['name', 'price', 'id', 'created_at', 'category_id']
        const availSort = ['asc', 'desc']
        if (isNaN(page) || isNaN(limit) || availOrder.includes(orderby) == false || availSort.includes(sort.toLowerCase()) == false) {
            //   Kalau tipe parameter ada yang salah
            error(res, 400, 'Wrong Parameter Type', {}, {})
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
                        // Kalau arraynya ada isinya
                        success(res, 200, 'Display All Menu Success', pagination, arr)
                    } else {
                        // Kalau arraynya kosong
                        success(res, 204, 'No data on this page', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau dari model ada trouble
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    },

    // Tampilkan detail dari sebuah menu
    getDetailMenus: (req, res) => {
        // Ambil params, params itu yang ada di link
        const id = req.params.id
        if (isNaN(id)) {
            // Kalau ID bukan number
            error(res, 400, 'Wrong ID Type', {}, {})
        } else {
            modelDetailMenus(id)
                .then((response) => {
                    if (response.length != 0) {
                        // Kalau responsenya gak kosong
                        success(res, 200, 'Successfully Display Detail Menu', {}, response)
                    } else {
                        // Kalau responsenya kosong
                        error(res, 400, 'Data Not Found, Wrong ID', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau dari model ada trouble
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    },

    // Tambahkan Menu baru
    addMenus: (req, res) => {
        const data = req.body
        if (data.image && data.category_id && data.price && data.name) {
            modelAddMenus(data)
                .then(() => {
                    // Kalau berhasil menambahkan data
                    success(res, 201, 'Add Menu Successfull', {}, {})
                })
                .catch((err) => {
                    // Kalau dari model ada trouble
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        } else if(isNaN(data.price) || isNaN(data.category_id)){
            // Kalau tidak ada yang kosong
            error(res, 400, 'Price and Category_id Should be Integer', {}, {})
        }else {
            // Kalau tidak ada yang kosong
            error(res, 400, 'Please fill all field!', {}, {})
        }

    },

    // Softdelete Menu
    deleteMenus: (req, res) => {
        const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
        const id = req.params.id
        if (isNaN(id)) {
            // Kalau ID bukan number
            error(res, 400, 'Wrong ID Type', {}, {})
        } else {
            modelDeleteMenus(id, currDate)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau ada rows yang berubah
                        success(res, 200, 'Delete Menu Successfull', {}, {})
                    } else {
                        // Kalau tidak ada  yagn terhapus
                        error(res, 400, 'Nothing deleted, Wrong ID!', {}, {})
                    }
                })
                .catch(() => {
                    // Kalau dari model ada trouble
                    error(res, 500, 'Data is used on some transaction', {}, {})
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
            // Kalau parameter ID salah
            error(res, 400, 'Wrong ID Type', {}, {})
        } else  if (data.image && data.category_id && data.price && data.name) {
            modelUpdateMenus(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau berhasil mengupdate
                        success(res, 200, 'Update Menu Successfull', {}, {})
                    } else {
                        // Kalau tidak ada yang terupdate
                        error(res, 400, 'Nothing Updated, Wrong ID!', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau dari model ada trouble
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        } else {
            // Kalau ada data yang kosong
            error(res, 400, 'Please Fill All Field!', {}, {})
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
            // Kalau parameter IDnya bukan number
            error(res, 'Wrong ID Type', {}, {})
        } else {
            modelPatchMenus(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Kalau ada data yang terubah
                        success(res, 201, 'Menu Patched!', {}, {})
                    } else {
                        // Kalau tidak ada data yang berubah
                        error(res, 400, 'Nothing Patched, Wrong ID!', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau dari model ada trouble
                    error(res, 500, `Server Side Error, ${err.message}`, {}, {})
                })
        }
    }

}