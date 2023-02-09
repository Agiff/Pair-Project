const {User, UserDetail, Product, Category} = require('../models')

class Controller {
    static getHome(req, res) {
        Product.findAll({
            include: {
                model: User
            }
        })
            .then(getHome => res.render('home', {getHome}))
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