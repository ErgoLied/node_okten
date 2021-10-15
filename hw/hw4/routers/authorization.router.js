const router = require('express').Router();

const authController = require('../controllers/authorization.controller');
const userMW = require('../middlewares/user.middlewares');
const {authorizationMW} = require('../middlewares/authorization.middleware');

router.post('/', userMW.isUserBodyValidMW, authorizationMW, authController.authorization);

module.exports = router;
