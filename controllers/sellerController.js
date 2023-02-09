const { Op } = require("sequelize");

const { User, UserDetail, Product, Category, Transaction } = require('../models');
const { currencyFormat } = require('../helper');

class SellerController {
  static sellerProfile(req, res) {
    const { sellerId } = req.params;
    const { deleted } = req.query;

    User.findOne({
      where: { id: sellerId },
      include: [
        {
          model: UserDetail
        },
        {
          model: Product,
          include: [Category]
        }
      ]
    })
      .then(seller => {
        res.render('sellerDetail', { seller, currencyFormat, deleted });
      })
      .catch(err => res.send(err));
  }

  static sellerShowEditProduct(req, res) {
    const { productId } = req.params;

    res.render('editProduct');
  }
  
  static sellerEditProduct(req, res) {
    console.log(req.body);
  }

  static sellerDeleteProduct(req, res) {
    const { productId } = req.params;
    const { userId } = req.session;

    let deletedProduct;

    Product.findByPk(productId)
      .then(product => {
        deletedProduct = product;
        return Product.destroy({ where: { id: productId } })
      })
      .then(() => {
        const { name, brand } = deletedProduct;
        const notif = `${name} Car with ${brand} as the brand has been deleted from your list.`;
        res.redirect(`/seller/${userId}?deleted=${notif}`)
      })
      .catch(err => res.send(err));
  }
}

module.exports = SellerController;