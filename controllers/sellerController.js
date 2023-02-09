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

  static sellerShowAddProduct(req, res) {
    Category.findAll()
      .then(categories => {
        res.render('addProduct', { categories });
      })
      .catch(err => res.send(err));
  }
  
  static sellerCreateProduct(req, res) {
    const { name, price, image, stock, brand, CategoryId, description } = req.body;
    const { userId } = req.session;

    Product.create({ name, price, image, stock, brand, CategoryId, description, UserId: userId })
      .then(() => res.redirect(`/seller/${userId}`))
      .catch(err => res.send(err));
  }

  static sellerShowEditProduct(req, res) {
    const { productId } = req.params;

    res.render('editProduct');
  }
  
  static sellerUpdateProduct(req, res) {
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