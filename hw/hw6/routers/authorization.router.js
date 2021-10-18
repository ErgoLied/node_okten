const {ADMIN, USER} = require('../configs/user-roles');
const router = require('express').Router();

const {authController} = require('../controllers');
const {userMW, authMW} = require('../middlewares');

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

router.post('/refresh', authMW.checkRefreshToken, authController.login);
// router.post('/logout', authMW.checkRefreshToken, authController.logout);

module.exports = router;
