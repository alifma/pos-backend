// Panggil Method dari model
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
        const name = req.query.name == undefined ? '' : req.query.name
        const limit = 9
        const page = req.query.page == undefined ? '1' : req.query.page
        const offset = page === 1 ? 0 : (page - 1) * limit
        const orderby = req.query.order == undefined ? 'id' : req.query.order
        const sort = req.query.sort == undefined ? 'ASC' : req.query.sort
        modelAllMenus(name, offset, limit, orderby, sort)
            .then((response) => {
                if (response.length != 0) {

                    res.json(response)
                } else {
                    res.json({
                        message: "No data on this page",
                        status: "ERROR"
                    })
                }
            })
            .catch((error) => {
                res.send(error.message)
            })
    },
    getDetailMenus: (req, res) => {
        // Ambil params, params itu yang ada di link
        const id = req.params.id
        modelDetailMenus(id)
            .then((response) => {
                if (response.length != 0) {
                    res.json(response)
                } else {
                    res.json({
                        message: "Nothing Found!",
                        status: "ERROR"
                    })
                }
            })
            .catch((error) => {
                res.send(error.message)
            })
    },
    addMenus: (req, res) => {
        // Ambil data dari body
        const data = req.body
        if (data.image) {
            modelAddMenus(data)
                .then(() => {
                    res.json({
                        message: 'Add Menu Successful!',
                        status: 'OK'
                    })
                })
                .catch((error) => {
                    res.send(error.message)
                })
        } else {
            res.send("ERROR : Image Should be Defined!")
        }

    },
    deleteMenus: (req, res) => {
        const id = req.params.id
        modelDeleteMenus(id)
            .then((response) => {
                if (response.affectedRows != 0) {
                    res.json({
                        message: 'Delete Menu Successful!',
                        status: 'OK'
                    })
                } else {
                    res.json({
                        message: 'Nothing Deleted!',
                        status: 'ERROR'
                    })
                }
            })
            .catch((error) => {
                res.send(error.message)
            })
    },
    updateMenus: (req, res) => {
        const id = req.params.id
        const data = req.body
        if (data.image) {
            modelUpdateMenus(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        res.json({
                            message: 'Data Menu Updated!',
                            status: 'OK'
                        })
                    } else {
                        res.json({
                            message: 'Nothing Updated!',
                            status: 'ERROR'
                        })
                    }
                })
                .catch((error) => {
                    res.send(error.message)
                })
        } else {
            res.send("ERROR : Image Should be Defined!")
        }
    },
    patchMenus: (req, res) => {
        const id = req.params.id
        const data = req.body
        modelPatchMenus(data, id)
            .then((response) => {
                if (response.affectedRows != 0) {
                    res.json({
                        message: 'Data Menu Patched!',
                        status: 'OK'
                    })
                } else {
                    res.json({
                        message: 'Nothing Patched!',
                        status: 'ERROR'
                    })
                }
            })
            .catch((error) => {
                res.send(error.message)
            })
    }

}