const router = require('express').Router();
const CustomerController = require('../controllers/customerController');

router.get('/product/:productId', CustomerController.productDetail);
router.get('/transaction', CustomerController.getTransaction)

module.exports = router;