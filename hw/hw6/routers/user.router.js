const router = require('express').Router();

const {userController} = require('../controllers');
const {userMW, authMW} = require('../middlewares');

router.get('/', userController.getUsers);
router.post('/', userMW.createUserBodyValidMW, userMW.createUserMW, userController.createUser);

router.get('/:userId', userMW.isUserByIdMW, authMW.checkAccessToken, userController.getUserById); //OAuth serv.
router.put('/:userId', userMW.updateUserBodyValidMW, userMW.isUserByIdMW, userController.updateUser);
router.delete('/:userId', userMW.isUserByIdMW, userController.deleteUser);

module.exports = router;
