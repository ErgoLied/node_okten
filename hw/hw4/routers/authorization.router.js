const router = require('express').Router();

const authController = require('../controllers/authorization.controller');
const {authBodyValidMW, authorizationMW} = require('../middlewares/authorization.middleware');

router.post('/', authBodyValidMW, authorizationMW, authController.authorization);

module.exports = router;
