const { User, UserDetail, Product, Category } = require('../models');
const { currencyFormat } = require('../helper');

class SellerController {
  static sellerHome(req, res) {
    console.log('welcome seller');
    Product.findAll({
        include: {
            model: User
        }
    })
        .then(getHome => res.render('home', { getHome, currencyFormat }))
        .catch(err => res.send(err))
  }
}

module.exports = SellerController;