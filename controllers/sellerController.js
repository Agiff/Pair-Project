const { User, UserDetail, Product, Category } = require('../models');
const bcrypt = require('bcryptjs');

class SellerController {
  static sellerHome(req, res) {
    Product.findAll({
        include: {
            model: User
        }
    })
        .then(getHome => res.render('home', { getHome }))
        .catch(err => res.send(err))
  }
}

module.exports = SellerController;