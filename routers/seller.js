const router = require('express').Router();
const SellerController = require('../controllers/sellerController');
const { isLoggedIn, isSeller } = require('../middlewares');

router.get('/seller/:sellerId', isLoggedIn, isSeller, SellerController.sellerProfile);

module.exports = router;