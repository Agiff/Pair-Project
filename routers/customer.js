const router = require('express').Router();
const CustomerController = require('../controllers/customerController');
const { isLoggedIn, isCustomer } = require('../middlewares');

router.get('/product/:productId', CustomerController.productDetail);
router.get('/customer/:customerId', isLoggedIn, isCustomer, CustomerController.customerProfile);

module.exports = router;