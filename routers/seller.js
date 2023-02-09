const router = require('express').Router();
const SellerController = require('../controllers/sellerController');

router.get('/seller', SellerController.sellerHome);

module.exports = router;