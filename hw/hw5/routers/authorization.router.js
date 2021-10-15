const {ADMIN, USER} = require('../configs/user-roles');
const router = require('express').Router();

const {authController} = require('../controllers');
const {authMW} = require('../middlewares');
const {userMW} = require('../middlewares');

router.post(
    '/',
    authMW.authBodyValidMW,
    authMW.authorizationMW,
    userMW.checkUserRole([
        ADMIN,
        USER
    ]),
    authController.login
);

module.exports = router;
