const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMW = require('../middlewares/user.middlewares');

router.get('/', userController.getUsers);
router.post('/', userMW.createUserBodyValidMW, userMW.createUserMW, userController.createUser);

router.get('/:userId', userMW.isUserByIdMW, userController.getUserById);
router.put('/:userId', userMW.updateUserBodyValidMW, userMW.isUserByIdMW, userController.updateUser);
router.delete('/:userId', userMW.isUserByIdMW, userController.deleteUser);

module.exports = router;
