const isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    const error = "Please login before proceeding.";
    return res.redirect(`/login?error=${error}`);
  }
  next();
}

const isSeller = (req, res, next) => {
  if (req.session.role !== 'Seller') {
    const error = "You don't have access to see this page.";
    return res.redirect(`/?error=${error}`);
  }
  next();
}

const isCustomer = (req, res, next) => {
  if (req.session.role !== 'Customer') {
    const error = "You don't have access to see this page.";
    return res.redirect(`/?error=${error}`);
  }
  next();
}

module.exports = { isLoggedIn, isSeller, isCustomer }