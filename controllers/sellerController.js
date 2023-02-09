const { User, UserDetail, Product, Category } = require('../models');
const { currencyFormat } = require('../helper');

class SellerController {
  static sellerHome(req, res) {
    console.log('welcome seller');
    UserDetail.findAll()
        .then(sellerHome => console.log(sellerHome))
        .catch(err => res.send(err))
  }
}

module.exports = SellerController;