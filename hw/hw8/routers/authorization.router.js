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
router.post('/logout', authMW.checkAccessToken, authController.logout);

router.post('/password/forgot', authController.sendMailForgotPassword);
router.post('/password/forgot/set', authController.setNewPasswordAfterRefresh);

module.exports = router;
