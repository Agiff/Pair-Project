const router = require('express').Router()
const Controller = require('../controllers');

router.get('/', Controller.getHome)

router.get('/register', Controller.showRegister);
router.post('/register', Controller.createUser);
router.get('/login', Controller.showLogin);
router.post('/login', Controller.login);

module.exports = router;