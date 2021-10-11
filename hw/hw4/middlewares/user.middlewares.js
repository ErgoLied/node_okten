const User = require('../database/User');
const userValidator = require('../validators/user.validator');

module.exports = {
    createUserMW: async (req, res, next) => {
        try{
            const {login} = req.body;
            const userLogin = await User.findOne({login});
            if(userLogin){
                throw new Error('this login already exists!');
            }
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    },

    isUserByIdMW: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await User.findOne({_id: userId});
            if(!user){
                throw new Error('we havn\'t user with id like this');
            }
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValidMW: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if(error){
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
