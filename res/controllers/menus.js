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
        const availOrder = ['name', 'price', 'id', 'created_at', 'category_id']
        const availSort = ['asc', 'desc']
        if (isNaN(page) || availOrder.includes(orderby) == false || availSort.includes(sort.toLowerCase()) == false) {
            res.json({
                message: "Wrong parameter",
                status: "ERROR"
            })
        } else {
            modelAllMenus(name, offset, limit, orderby, sort)
                .then((response) => {
                    if (response.length != 0) {
                        const newResponse = response.map(i => ({
                            ...i,
                            isClicked: false
                        }))
                        res.json(newResponse)
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
        }

    },
    getDetailMenus: (req, res) => {
        // Ambil params, params itu yang ada di link
        const id = req.params.id
        if (isNaN(id)) {
            res.json({
                message: "Wrong Id Type!",
                status: "ERROR"
            })
        } else {
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
        }
    },
    addMenus: (req, res) => {
        // Ambil data dari body
        const data = req.body
        if (data.image || data.length == 0) {
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
            res.send("ERROR : Please fill all field!")
        }

    },
    deleteMenus: (req, res) => {
        const id = req.params.id
        if (isNaN(id)) {
            res.send('ERROR : Wrong ID Type')
        } else {
            modelDeleteMenus(id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        res.json({
                            message: 'Delete Menu Successful!',
                            status: 'OK'
                        })
                    } else {
                        res.json({
                            message: 'Nothing Deleted, Wrong ID!',
                            status: 'ERROR'
                        })
                    }
                })
                .catch((error) => {
                    res.send('ERROR : Data is used on some transaction')
                })
        }
    },
    updateMenus: (req, res) => {
        const id = req.params.id
        const currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const data = {
            ...req.body,
            "updated_at": currDate
        }
        if (isNaN(id)) {
            res.send('ERROR : Wrong ID Type')
        } else if (data.image || data.length == 0) {
            modelUpdateMenus(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        res.json({
                            message: 'Data Menu Updated!',
                            status: 'OK'
                        })
                    } else {
                        res.json({
                            message: 'Nothing Updated, Wrong ID!',
                            status: 'ERROR'
                        })
                    }
                })
                .catch((error) => {
                    res.send(error.message)
                })
        } else {
            res.send("ERROR : Please fill all field!")
        }
    },
    patchMenus: (req, res) => {
        const id = req.params.id
        const currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const data = {
            ...req.body,
            "updated_at": currDate
        }
        if (isNaN(id)) {
            res.send('ERROR : Wrong ID Type')
        } else {
            modelPatchMenus(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        res.json({
                            message: 'Data Menu Patched!',
                            status: 'OK'
                        })
                    } else {
                        res.json({
                            message: 'Nothing Patched, Wrong ID!',
                            status: 'ERROR'
                        })
                    }
                })
                .catch((error) => {
                    res.send(error.message)
                })
        }
    }

}