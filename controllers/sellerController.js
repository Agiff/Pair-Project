const { Op } = require("sequelize");

const { User, UserDetail, Product, Category } = require('../models');
const { currencyFormat } = require('../helper');

class SellerController {
  static sellerProfile(req, res) {
    const { sellerId } = req.params;

    UserDetail.findAll()
      .then(seller => {
        console.log(seller);
      })
      .catch(err => res.send(err));
  }
}

module.exports = SellerController;