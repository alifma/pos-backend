// Panggil Method dari model
const {
    modelAllMenus
} = require('../models/menus')

module.exports = {
    getAllMenus: (req, res) => {
        modelAllMenus()
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.send(error)
            })
    }
}