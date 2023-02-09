const { Op } = require("sequelize");

const { User, UserDetail, Product, Category, Transaction } = require('../models');
const { currencyFormat } = require('../helper');

class SellerController {
  static sellerProfile(req, res) {
    const { sellerId } = req.params;
    const { deleted } = req.query;

    let seller;

    User.findOne({
      where: { id: sellerId },
      include: [UserDetail]
    })
      .then(currentSeller => {
        seller = currentSeller;
        return Product.findAll({
          where: { UserId: sellerId },
          include: [Category]
        })
      })
      .then(products => {
        res.render('sellerDetail', { seller, currencyFormat, deleted, products });
      })
      .catch(err => res.send(err));
  }

  static sellerShowAddProduct(req, res) {
    const { userId } = req.session;
    const { errors } = req.query;

    Category.findAll()
      .then(categories => {
        res.render('addProduct', { categories, userId, errors });
      })
      .catch(err => res.send(err));
  }
  
  static sellerCreateProduct(req, res) {
    const { name, price, image, stock, brand, CategoryId, description } = req.body;
    const { userId } = req.session;

    Product.create({ name, price, image, stock, brand, CategoryId, description, UserId: userId })
      .then(() => res.redirect(`/seller/${userId}`))
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          const errors = err.errors.map(({message}) => {
            return message;
          })
          res.redirect(`/seller/product/add?errors=${errors}`)
        } else {
          res.send(err);
        }
      });
  }

  static sellerShowEditProduct(req, res) {
    const { productId } = req.params;
    const { userId } = req.session;

    let product;

    Product.findByPk(productId)
      .then(selectedProduct => {
        product = selectedProduct;
        return Category.findAll();
      })
      .then(categories => {
        res.render('editProduct', { product, categories, userId });
      })
      .catch(err => res.send(err));
  }
  
  static sellerUpdateProduct(req, res) {
    const { name, price, image, stock, brand, CategoryId, description } = req.body;
    const { userId } = req.session;
    const { productId } = req.params

    Product.update({ name, price, image, stock, brand, CategoryId, description, UserId: userId }, {
      where: { id: productId }
    })
      .then(() => res.redirect(`/seller/${userId}`))
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          const errors = err.errors.map(({message}) => {
            return message;
          })
          res.redirect(`/seller/product/add?errors=${errors}`)
        } else {
          res.send(err);
        }
      });
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