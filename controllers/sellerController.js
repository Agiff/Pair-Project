const { Op } = require("sequelize");

const { User, UserDetail, Product, Category } = require('../models');
const { currencyFormat } = require('../helper');

class SellerController {
  static sellerProfile(req, res) {
    const { sellerId } = req.params;
    const { userId } = req.session;
    if(userId !== +sellerId) return res.redirect(`/login?error=You dont have access to that page.`)
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