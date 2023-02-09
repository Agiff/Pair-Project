const bcrypt = require('bcryptjs');

const { User, Product, Category } = require('../models');
const { currencyFormat } = require('../helper');
const { Op } = require('sequelize');

class UserController {
  static getHome(req, res) { 
    const { userId, role } = req.session;
    let {search, param, type, sortBy} = req.query
    let include = {model: Category}
    let where = {};
    let order;
    let statement;
    let tipeSort = `ASC`
    if(type) tipeSort = type
    if(sortBy) order = [[`${sortBy}`, tipeSort]]
    if(search === `byName`) where = {name: { [Op.iLike] : `%${param}%`}}
    if(search === `byBrand`) where = {brand: { [Op.iLike] : `%${param}%`}}
    if(order) statement = {include, where, order};
    else statement = {include, where}
    Product.findAll(statement)
        .then(getHome => res.render('home', { getHome, currencyFormat, userId, role }))
        .catch(err => res.send(err))
  }

  static showRegister(req, res) {
    res.render('register');
  }

  static createUser(req, res) {
    const { email, password, role } = req.body;

    User.create({ email, password, role })
      .then(createdUser => {
        res.redirect('/login');
      })
      .catch(err => res.send(err));
  }

  static showLogin(req, res) {
    const { error } = req.query;
    res.render('login', { error });
  }

  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) {
          const error = "The email address you entered isn't connected to an account.";
          return res.redirect(`/login?error=${error}`);
        }

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
          const error = "The password that you've entered is incorrect.";
          return res.redirect(`/login?error=${error}`);
        }

        req.session.userId = user.id;
        req.session.role = user.role;
        res.redirect('/');
      })
      .catch(err => res.send(err));
  }

  static logout(req, res) {
    req.session.destroy(err => {
      if (err) return res.send(err);
      res.redirect('/login');
    })
  }
}

module.exports = UserController;