const router = require('express').Router();
const CustomerController = require('../controllers/customerController');

router.get('/', CustomerController.getHome);

router.get('/register', CustomerController.showRegister);
router.post('/register', CustomerController.createUser);
router.get('/login', CustomerController.showLogin);
router.post('/login', CustomerController.login);

router.get('/product/:productId', CustomerController.productDetail);

module.exports = router;