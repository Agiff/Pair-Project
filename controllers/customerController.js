const { User, UserDetail, Product, Category, Transaction } = require('../models');
const { currencyFormat } = require('../helper');
const { isCustomer } = require('../middlewares');
const { Op } = require('sequelize');

class CustomerController {
  static productDetail(req, res) {
    res.send('asd')
  }

  static getTransaction(req, res) {
    const { userId, role } = req.session;
    if(role !== `Customer`) res.redirect(`/login?error=Please login using customer account, before accessing transaction.`)
    let include = [{model:Product, include:{model:Category}, order:[['name', 'DESC']]}]
    User.findByPk(req.session.userId,{include})
      .then(getTransaction => res.render('transaction', {getTransaction, userId, role, currencyFormat}))
      .catch(err => res.send(err))
  }

  static customerProfile(req, res) {
    const { customerId } = req.params;
    
    UserDetail.findOne({
      where: { UserId: customerId }
    })
      .then(customer => {
        res.render('customerDetail', { customer, userId:customerId });
      })
      .catch(err => res.send(err));
  }
}

module.exports = CustomerController;