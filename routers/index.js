const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { isLoggedIn } = require('../middlewares');
const customerRoutes = require('./customer');
const sellerRoutes = require('./seller');

router.get('/', UserController.getHome);

router.get('/register', UserController.showRegister);
router.post('/register', UserController.createUser);
router.get('/login', UserController.showLogin);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/updateUser/:id', isLoggedIn, UserController.showEditUserDetail);
router.post('/updateUser/:id', isLoggedIn, UserController.updateUserDetail);

router.use(customerRoutes);
router.use(isLoggedIn, sellerRoutes);

module.exports = router;