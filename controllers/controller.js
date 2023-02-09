const {User, UserDetail, Product, Category} = require('../models')
const {formatRupiah} = require('../helpers/helper')

class Controller {
    static getHome(req, res) {
        Product.findAll({
            include: {
                model: Category
            }
        })
            .then(getHome => res.render('home', {getHome, formatRupiah}))
            .catch(err => res.send(err))
    }
    static get(req, res) {
        
    }
    static get(req, res) {
        
    }
    static get(req, res) {
        
    }
    static get(req, res) {
        
    }
}

module.exports = Controller