const router = require('express').Router();

const {userController} = require('../controllers');
const {userMW, authMW} = require('../middlewares');
const {userValidator} = require('../validators');

router.get('/', userController.getUsers);
router.post('/', userMW.isUserBodyValidMW(userValidator.createUserValidator), userMW.createUserMW, userController.createUser);

router.get('/:userId', userMW.isUserByIdMW, authMW.checkAccessToken, userController.getUserById);
router.put('/:userId',
    userMW.isUserByIdMW,
    authMW.checkAccessToken,
    userMW.isUserBodyValidMW(userValidator.updateUserValidator),
    userController.updateUser);
router.delete('/:userId', userMW.isUserByIdMW, authMW.checkAccessToken, userController.deleteUser);

module.exports = router;
