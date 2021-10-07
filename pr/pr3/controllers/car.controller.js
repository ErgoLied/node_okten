const Car = require('../database/RetroCar');

module.exports = {
    getCars: async (req, res) => {
        try {
            const cars = await Car.find();
            res.json(cars);
        } catch (e) {
            res.json(e);
        }
    },

    getCarById: async (req, res) => {
        try {
            const {carId} = req.params;
            const car = await Car.findById(carId);
            res.json(car);
        } catch (e) {
            res.json(e);
        }
    },

    createCar: async (req, res) => {
        try {
            const newCar = await Car.create(req.body);
            res.json(newCar);
        } catch (e) {
            res.json(e);
        }
    },

    updateCar: async (req, res) => {
        try {
            const {carId} = req.params;
            await Car.findByIdAndUpdate(carId, req.body).then(() => {
                Car.findById(carId).then((car) => {
                    res.json(car);
                });
            });
        } catch (e) {
            res.json(e);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const {carId} = req.params;
            await Car.findByIdAndDelete(carId).then((car) => {
                res.json(car);
            });
        } catch (e) {
            res.json(e);
        }
    }
};
