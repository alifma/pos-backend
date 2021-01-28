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
    modelRedisMenus
} = require('../models/menus')

// Remove File Operation
const fs = require('fs')

// MomentJS
const moment = require('moment');

// Response Helper 
const {
    error,
    success
} = require('../helpers/response')

// Redis Client
const redisClient = require('../config/redis');
const { isUndefined, isNull } = require('lodash');

module.exports = {
    // Lempar All menus ke Redist
    setRedisMenus: () => {
        // Panggil Models All Active
        modelRedisMenus().then((response) => {
            // Ubah Response jadi String agar bisa disimpan di redis
            const data = JSON.stringify(response)
            // Set Data ke RedisClient
            redisClient.set('dataMenus', data)
        }).catch((err) => {
            // Kalua ada Error
            error(res, 400, 'Internal Server Redis Error', err.message, {})
        })
    },
    // Tampilkan Semua Menu yang aktif
    getAllMenus: async (req, res) => {
        try {
            // Ambil Query dari URL
            const limit = req.query.limit ? Number(req.query.limit) : 9
            const page = req.query.page ? Number(req.query.page) : 1
            const name = req.query.name ? req.query.name : ''
            const offset = page === 1 ? 0 : (page - 1) * limit
            const orderby = req.query.order ? req.query.order : 'id'
            const sort = req.query.sort ? req.query.sort : 'ASC'
            const deleteStatus = req.query.ready ? req.query.ready : 1
            // Ambil dari Modal pakai Await
            const total = await modelTotalMenus()
            const totalResult = await modelTotalResult(name)
            const listPages = []
            for(let i = 1; i <= Math.ceil(totalResult[0].total / limit); i++){
                listPages.push('?name='+name+'&limit='+limit+'&page='+i)
            }
            modelAllMenus(name, offset, limit, orderby, sort, deleteStatus)
                .then((response) => {
                    if (response.length != 0) {
                        const arr = response.map(i => ({
                            ...i,
                            isClicked: false
                        }))
                        const pagination = {
                            // Halaman Saat Ini
                            page: page,
                            // Limit Tiap Halaman
                            limit: limit,
                            // Semua menu yang aktif
                            totalMenus: total[0].total,
                            // Semua menu yang Sesuai Query
                            totalResult: totalResult[0].total,
                            // Status yang Ditampilkan:
                            menusType: deleteStatus == 1 ? 'Active' : 'Inactive',
                            // Jumlah Page yang Sesuai Query
                            pageResult: Math.ceil(totalResult[0].total / limit),
                            // Daftar Page Tersedia
                            pagesList: listPages
                        }
                        // Set data ke Redis
                        module.exports.setRedisMenus()
                        // Kalau arraynya ada isinya
                        success(res, 200, 'Display Menu Success', pagination, arr)
                    } else {
                        // Kalau arraynya kosong
                        error(res, 400, 'No data on this page', '0 Result', {})
                    }
                })
                .catch((err) => {
                    // Kalau ada problem dari query nya
                    error(res, 400, 'Wrong Query Given', err.message, {})
                })
        } catch (err) {
            // Kalau ada masalah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})    
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
                        error(res, 400, 'Data Not Found, Wrong ID', '0 Result', {})
                    }
                })
                .catch((err) => {
                    // Kalau Tipe ID Salah 
                    error(res, 400, 'Wrong Parameter Type Given', err.message, {})
                })
        } catch (err) {
            // Kalau ada masalah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }


    },

    // Tambahkan Menu baru
    addMenus: (req, res) => {
        try {
            const rawData = req.body
            if ( rawData.category_id && rawData.price && rawData.name &&  rawData.category_id!='' && rawData.price!=0 && !isUndefined(req.file)) {
                const data = {
                    name: rawData.name,
                    price: rawData.price,
                    category_id: rawData.category_id,
                    image: req.file.filename
                }
                modelAddMenus(data)
                    .then(() => {
                        // Set data ke Redis
                        module.exports.setRedisMenus()
                        // Kalau berhasil menambahkan data
                        success(res, 200, 'Add Menu Success', {}, {})
                    })
                    .catch((err) => {
                        // Hapus File yang terupload keupload kalau gak jadi
                        if(req.file){
                            fs.unlinkSync(`./public/img/${req.file.filename}`)
                        }
                        // Kalau tipe data ada yang salah
                        error(res, 400, 'Wrong Data Type Given', err.message, {})
                    })
            } else {
                // Hapus File yang terupload keupload kalau gak jadi
                if(req.file){
                    fs.unlinkSync(`./public/img/${req.file.filename}`)
                }
                // Kalau ada data yang kosong
                error(res, 400, 'Please fill all field!', 'Empty field found', {})
            }
        } catch (err) {
            // Hapus File yang terupload keupload kalau gak jadi
            if(req.file){
                fs.unlinkSync(`./public/img/${req.file.filename}`)
            }
            // Kalau ada masalah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }

    },

    // Delete Menu
    deleteMenus: (req, res) => {
        try {
            const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
            const id = req.params.id
            // Delete File
            modelDetailMenus(id)
                .then((res)=> {
                    fs.unlinkSync(`./public/img/${res[0].image}`)
                })
                .catch((err)=>{console.log(err)})
                
            modelDeleteMenus(id, currDate)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        // Set data ke Redis
                        module.exports.setRedisMenus()
                        // Kalau ada yang terhapus
                        success(res, 200, 'Delete Menu Success', {}, {})
                    } else {
                        // Kalau tidak ada  yang terhapus karena salah ID
                        error(res, 400, 'Nothing deleted, Wrong ID!', {}, {})
                    }
                })
                .catch((err) => {
                    // Kalau Tipe ID Salah 
                    error(res, 400, 'Wrong Parameter Type Given', err.message, {})
                })
        } catch (err) {
            // Kalau ada masalah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    },

    // Perbarui Menu(Keseluruhan)
    updateMenus: (req, res) => {
        try {
            const id = req.params.id
            const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
            const rawData = req.body
            if (rawData.category_id && rawData.price && rawData.name && !isUndefined(req.file)) {
                const baseData = {
                    name: rawData.name,
                    price: rawData.price,
                    category_id: rawData.category_id,
                    image: req.file.filename
                }
                const data = {
                    ...baseData,
                    'updated_at': currDate
                }
                modelUpdateMenus(data, id)
                    .then((response) => {
                        if (response.affectedRows != 0) {
                            // Set data ke Redis
                            module.exports.setRedisMenus()
                            // Kalau berhasil mengupdate
                            success(res, 200, 'Update Menu Success', {}, {})
                        } else {
                            // Hapus File yang Tadi keupload kalau gak jadi
                            if(req.file){
                                fs.unlinkSync(`./public/img/${req.file.filename}`)
                            }
                            // Kalau tidak ada yang terupdate
                            error(res, 400, 'Nothing Updated, Wrong ID', {}, {})
                        }
                    })
                    .catch((err) => {
                        // Hapus File yang terupload keupload kalau gak jadi
                        if(req.file){
                            fs.unlinkSync(`./public/img/${req.file.filename}`)
                        }
                        // Kalau tipe data ada yang salah
                        error(res, 400, 'Wrong Data Type Given', err.message, {})
                    })
            } else {
                // Hapus File yang Tadi keupload kalau gak jadi
                if(req.file){
                    fs.unlinkSync(`./public/img/${req.file.filename}`)
                }
                // Kalau ada data yang kosong
                error(res, 400, 'Please Fill All Field!', 'Empty field found', {})
            }
        } catch (err) {
            // Hapus File yang terupload keupload kalau gak jadi
            if(req.file){
                fs.unlinkSync(`./public/img/${req.file.filename}`)
            }
            // Kalau ada masalah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    },

    // Perbarui Menu (Beberapa Kolom)
    patchMenus: (req, res) => {
        try {
            const id = req.params.id
            const currDate = moment().format('YYYY-MM-DDThh:mm:ss.ms');
            const rawData = req.body
            if(rawData.category_id || rawData.price || rawData.name || !isUndefined(req.file) || rawData.isReady ){
                // Hapus Gambar jika gambarnya tidak kosong
                let data = {}
                if(!isUndefined(req.file)) {
                    data = {
                        ...rawData,
                        image: req.file.filename,
                        'updated_at': currDate
                    }
                    modelDetailMenus(id)
                        .then((res)=> {
                            fs.unlinkSync(`./public/img/${res[0].image}`)
                        })
                        .catch((err)=>{console.log(err)})
                }else{
                    data = {
                        ...rawData,
                        'updated_at': currDate
                    } 
                }
                // Update Data Menus
                modelPatchMenus(data, id)
                    .then((response) => {
                        if (response.affectedRows != 0) {
                            // Set data ke Redis
                            module.exports.setRedisMenus()
                            // Kalau ada data yang terupdate
                            success(res, 200, 'Patch Menu Success', {}, {})
                        } else {
                            // Hapus File yang terupload keupload kalau gak jadi
                            if(req.file){
                                fs.unlinkSync(`./public/img/${req.file.filename}`)
                            }
                            // Kalau tidak ada data yang berubah
                            error(res, 400, 'Nothing Patched, Wrong ID', '0 Result', {})
                        }
                    })
                    .catch((err) => {
                        // Hapus File yang terupload keupload kalau gak jadi
                        if(req.file){
                            fs.unlinkSync(`./public/img/${req.file.filename}`)
                        }
                        // Kalau tipe data ada yang salah
                        error(res, 400, 'Wrong Data Type Given', err.message, {})
                    })
            }else{
                // Kalau tidak ada data yang dimasukkan 
                error(res, 400, 'Nothing Patched, No Data Given', 'Empty Data', {})
            }
        } catch (err) {
            // Hapus File yang Tadi keupload kalau gak jadi
            if(req.file){
                fs.unlinkSync(`./public/img/${req.file.filename}`)
            }
            // Kalau ada masalah lainnya
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    }
}