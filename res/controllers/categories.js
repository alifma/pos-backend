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
                res.send(error)
            })
    },
    getDetailCtgry: (req, res) => {
        const id = req.params.id
        modelDetailCtgry(id)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.send(error)
            })
    },
    deleteCtgry: (req, res) => {
        const id = req.params.id
        modelDeleteCtgry(id)
            .then((response) => {
                res.json({
                    status: "Deleted"
                })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    addCtgry: (req, res) => {
        const data = req.body
        modelAddCtgry(data)
            .then((response) => {
                res.json({
                    status: "Success"
                })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    updateCtgry: (req, res) => {
        const data = req.body
        const id = req.params.id
        modelUpdateCtgry(data, id)
            .then((response) => {
                res.json({
                    status: "Updated"
                })
            })
            .catch((error) => {
                req.send(error)
            })
    }
}