// Panggil Method dari model
const {
    query
} = require('../config/database')
const {
    modelAllMenus,
    modelDetailMenus,
    modelAddMenus,
    modelDeleteMenus,
    modelUpdateMenus,
    modelPatchMenus
} = require('../models/menus')

module.exports = {
    getAllMenus: (req, res) => {
        const name = req.query.name
        const limit = 9
        const page = req.query.page
        const offset = page === 1 ? 0 : (page - 1) * limit
        modelAllMenus(name, offset, limit)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.send(error)
            })
    },
    getDetailMenus: (req, res) => {
        // Ambil params, params itu yang ada di link
        const id = req.params.id
        modelDetailMenus(id)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.send(error)
            })
    },
    addMenus: (req, res) => {
        // Ambil data dari body
        const data = req.body
        modelAddMenus(data)
            .then((response) => {
                res.json({
                    status: 'ok'
                })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    deleteMenus: (req, res) => {
        const id = req.params.id
        modelDeleteMenus(id)
            .then((response) => {
                res.json({
                    status: 'Deleted'
                })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    updateMenus: (req, res) => {
        const id = req.params.id
        const data = req.body
        modelUpdateMenus(data, id)
            .then((response) => {
                res.json({
                    status: 'Updated'
                })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    patchMenus: (req, res) => {
        const id = req.params.id
        const data = req.body
        modelPatchMenus(data, id)
            .then((response) => {
                res.json({
                    status: 'Patched'
                })
            })
            .catch((error) => {
                res.send(error)
            })
    }

}