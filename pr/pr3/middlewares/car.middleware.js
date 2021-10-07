const Car = require('../database/RetroCar');

module.exports = {
    createCarMiddleware: async (req, res, next) => {
        try{
            const carByBrand = await Car.find({brand: req.body.brand});
            if(carByBrand){
                throw new Error('only one type of brand can be created!');
            }
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
