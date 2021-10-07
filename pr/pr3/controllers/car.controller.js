const Car = require('../database/RetroCar');

module.exports = {
    getCars: async (req, res) => {
        const cars = await Car.find();
        res.json(cars);
    },

    getCarById: async (req, res) => {
        const {carId} = req.params;
        const car = await Car.findById(carId);
        res.json(car);
    },

    createCar: async (req, res) => {
        const newCar = await Car.create(req.body);
        res.json(newCar);
    },

    updateCar: async (req, res) => {
        const {carId} = req.params;
        await Car.findByIdAndUpdate(carId, req.body).then(() => {
            Car.findById(carId).then((car) => {
                res.json(car);
            });
        });
    },

    deleteCar: async (req, res) => {
        const {carId} = req.params;
        await Car.findByIdAndDelete(carId).then((car) => {
            res.json(car);
        });
    }
};
