const { Op } = require("sequelize");

const { User, UserDetail, Product, Category } = require('../models');
const { currencyFormat } = require('../helper');

class SellerController {
  static sellerProfile(req, res) {
    const { sellerId } = req.params;

    UserDetail.findOne({
      where: { UserId: sellerId }
    })
      .then(seller => {
        res.render('sellerDetail', { seller });
      })
      .catch(err => res.send(err));
  }
}

module.exports = SellerController;