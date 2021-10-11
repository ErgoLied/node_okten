const router = require('express').Router();

const userController = require('../controllers/user.controller');
const {isUserBodyValidMW, createUserMW, isUserByIdMW} = require("../middlewares/user.middlewares");

router.get('/', userController.getUsers);
router.post('/', isUserBodyValidMW, createUserMW, userController.createUser);

router.get('/:userId', isUserByIdMW, userController.getUserById);
router.put('/:userId', isUserByIdMW, userController.updateUser);
router.delete('/:userId', isUserByIdMW, userController.deleteUser);

module.exports = router;
