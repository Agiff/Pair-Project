const { User, UserDetail, Product, Category } = require('../models');
const { currencyFormat } = require('../helper');

class CustomerController {
  static productDetail(req, res) {
    res.send('asd')
  }

  static customerProfile(req, res) {
    const { customerId } = req.params;
    
    UserDetail.findOne({
      where: { UserId: customerId }
    })
      .then(customer => {
        res.render('customerDetail', { customer });
      })
      .catch(err => res.send(err));
  }
}

module.exports = CustomerController;