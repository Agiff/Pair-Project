const { User, UserDetail, Product, Category } = require('../models');
const { currencyFormat } = require('../helper');
const { isCustomer } = require('../middlewares');

class CustomerController {
  static productDetail(req, res) {
    res.send('asd')
  }

  static getTransaction(req, res) {
    console.log(req.session.role)
    let include = {model:Product}
    let where = {id : req.session.userId}
    console.log(where)
    User.findByPk({include, where})
      .then(getTransaction => res.render('transaction', {getTransaction}))
      .catch(err => res.send(err))
  }
}

module.exports = CustomerController;