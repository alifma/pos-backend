const {
    modelAllCtgry,
    modelDetailCtgry,
    modelDeleteCtgry,
    modelAddCtgry,
    modelUpdateCtgry
} = require('../models/categories')

module.exports = {
    getAllCtgry: (req, res) => {
        modelAllCtgry()
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.send(error.message)
            })
    },
    getDetailCtgry: (req, res) => {
        const id = req.params.id
        if (isNaN(id)) {
            res.json({
                message: "Wrong Id Type!",
                status: "ERROR"
            })
        } else {
            modelDetailCtgry(id)
                .then((response) => {
                    if (response.length != 0) {
                        res.json(response)
                    } else {
                        res.json({
                            message: "ID Not Found",
                            status: "ERROR"
                        })
                    }
                })
                .catch((error) => {
                    res.send(error.message)
                })
        }
    },
    deleteCtgry: (req, res) => {
        const id = req.params.id
        if (isNaN(id)) {
            res.send('ERROR : Wrong ID Type')
        } else {
            modelDeleteCtgry(id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        res.json({
                            message: "Category Deleted",
                            status: "OK"
                        })
                    } else {
                        res.json({
                            message: "Nothing Deleted, ID not Found",
                            status: "ERROR"
                        })
                    }
                })
                .catch((error) => {
                    res.send(error.message)
                })
        }
    },
    addCtgry: (req, res) => {
        const data = req.body
        if (data.name) {
            modelAddCtgry(data)
                .then(() => {
                    res.json({
                        message: "New Category Added!",
                        status: "OK"
                    })
                })
                .catch((error) => {
                    res.send(error.message)
                })
        } else {
            res.send('ERROR : Name cannot be null!')
        }
    },
    updateCtgry: (req, res) => {
        const currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const id = req.params.id
        const data = {
            ...req.body,
            "updated_at": currDate
        }
        if (data.name) {
            modelUpdateCtgry(data, id)
                .then((response) => {
                    if (response.affectedRows != 0) {
                        res.json({
                            message: "Category Updated!",
                            status: "OK"
                        })
                    } else {
                        res.json({
                            message: "Nothing Updated, Wrong ID!",
                            status: "ERROR"
                        })
                    }
                })
                .catch((error) => {
                    res.send(error.message)
                })
        } else {
            res.send('ERROR : Name cannot be null!')
        }
    }
}