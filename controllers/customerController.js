const { User, UserDetail, Product, Category, Transaction, Cart, CartProduct } = require('../models');
const { currencyFormat } = require('../helper');
const { isCustomer, isLoggedIn } = require('../middlewares');
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
    const {customerId} = req.params;
    const { userId, role } = req.session;
    if(userId !== +customerId) return res.redirect(`/login?error=You dont have access to that page.`)
    UserDetail.findOne({
      where: { UserId: userId }
    })
      .then(customer => {
        res.render('customerDetail', { customer, userId, role, currencyFormat });
      })
      .catch(err => res.send(err));
  }

  static addToCart(req, res) {
    const {productId:ProductId} = req.params;
    const { userId } = req.session;
    if(!userId) return res.redirect ('/login?error=You session is ended, please login again.')
    Cart.findOne({where: {UserId:+userId}})
      .then(getCart => {
        const {id} = getCart
        console.log(id, +ProductId)
        console.log(getCart);
        return CartProduct.create({ProductId : +ProductId, CartId:id})
      })
      .then(() => res.redirect('/'))
      .catch(err => res.send(err))
  }

  static getCart(req, res) {
    let {errors} = req.query
    const { userId, role } = req.session;
    if(!userId) return res.redirect ('/login?error=You session is ended, please login again.')
    Cart.findOne({where: {UserId:+userId}, include:[{model:Product}, {model:User, include:{model:UserDetail}}]})
      .then(getCart => res.render('cart', {getCart, userId, role, errors, currencyFormat}))
      .catch(err => res.send(err))
  }

  static getPayCart(req, res) {
    const { userId, role } = req.session;
    let {totalPrice} = req.query
    Cart.findOne({where: {UserId:+userId}, include:[{model:Product, order:[['name']]}, {model:User, include:{model:UserDetail}}]})
    .then(getCart => {
      let {User, Products} = getCart.dataValues
      let {UserDetail} = User.dataValues
      let {balance} = UserDetail.dataValues
      console.log(`========================================`)
      let arrIdProduct = Products.map(el => {
        let {id} = el.dataValues
        return id
      })
      if(+totalPrice === 0) throw {name:`custom`, msg: `Nothing to buy, add product first`}
      else if(balance >= +totalPrice){
        console.log(`HEREEEEEEEEEE`)
         return UserDetail.increment({balance: -totalPrice})
      }
      else {
        throw {name:`custom`, msg: `Balance not enough`}
      }
    })
    .then(arr => {
      console.log(`Deleteeeee`, arr)
      let {cartId} = req.params
      return CartProduct.destroy({
        where: {
          CartId: +cartId
        }
      })
    })
    .then()
    .then(success=> res.redirect(`/Customer/${userId}/cart`))
    .catch(err => {
      if(err.name === `custom`) return res.redirect(`/customer/${userId}/cart?errors=${err.msg}`)
      else res.send(err)})
  }

  static showUserTopUp(req, res) {
    const { customerId } = req.params;
    res.render('topup', { customerId });
  }

  static userTopUp(req, res) {
    const { topup } = req.body;
    const { customerId } = req.params;

    UserDetail.increment('balance', {
      where: { UserId: customerId },
      by: topup
    })
      .then(() => res.redirect(`/customer/${customerId}`))
      .catch(err => res.send(err));
  }
}

module.exports = CustomerController;