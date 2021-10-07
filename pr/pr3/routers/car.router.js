const router = require('express').Router();

const carController = require('../controllers/car.controller');
const carMiddleware = require('../middlewares/car.middleware');

router.get('/', carController.getCars);
router.post('/', carMiddleware.createCarMiddleware, carController.createCar);

router.get('/:carId', carController.getCarById);
router.put('/:carId', carController.updateCar);
router.delete('/:carId', carController.deleteCar);

module.exports = router;
