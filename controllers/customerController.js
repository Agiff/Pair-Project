const { User, UserDetail, Product, Category } = require('../models');
const { currencyFormat } = require('../helper');

class CustomerController {
  static productDetail(req, res) {
    res.send('asd')
  }

  static customerProfile(req, res) {
    const { customerId } = req.params;
    // User.findOne({
    //   where: {
    //     id: 
    //   }
    // })a
  }
}

module.exports = CustomerController;