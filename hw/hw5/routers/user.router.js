const router = require('express').Router();

const {userController} = require('../controllers');
const {userMW} = require('../middlewares');

router.get('/', userController.getUsers);
router.post('/', userMW.isUserBodyValidMW, userMW.createUserMW, userController.createUser);

router.get('/:userId', userMW.isUserByIdMW, userController.getUserById);
router.put('/:userId', userMW.isUserBodyValidMW, userMW.isUserByIdMW, userController.updateUser);
router.delete('/:userId', userMW.isUserByIdMW, userController.deleteUser);

module.exports = router;
