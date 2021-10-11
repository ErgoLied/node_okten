const router = require('express').Router();

const authController = require('../controllers/authorization.controller');
const {authorizationMW} = require("../middlewares/authorization.middleware");

router.post('/', authorizationMW, authController.authorization);

module.exports = router;
