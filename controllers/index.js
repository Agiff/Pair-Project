const { User, UserDetail, Product, Category } = require('../models');
const bcrypt = require('bcryptjs');

class Controller {
  static showRegister(req, res) {
    res.render('register');
  }

  static createUser(req, res) {
    const { email, password, role } = req.body;

    User.create({ email, password, role })
      .then(createdUser => {
        console.log(createdUser);
        res.redirect('/login');
      })
      .catch(err => res.send(err));
  }

  static showLogin(req, res) {
    const { authFailed } = req.query;
    res.render('login', { authFailed });
  }

  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) return res.redirect("/login?authFailed=The email address you entered isn't connected to an account.");
        const checkPassword = bcrypt.compareSync(password, user.password);
        
        if (checkPassword) return res.render('home');
        res.redirect("/login?authFailed=The password that you've entered is incorrect.");
      })
      .catch(err => res.send(err));
  }
  static getHome(req, res) {
    Product.findAll({
        include: {
            model: Category
        }
    })
        .then(getHome => res.render('home', {getHome, formatRupiah}))
        .catch(err => res.send(err))
}
}

module.exports = Controller;