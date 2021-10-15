const User = require('../database/User');
const userValidator = require('../validators/user.validator');

module.exports = {
    createUserMW: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new Error('this email already exists!');
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

            if (!user) {
                throw new Error('user not found');
            }

            next();
        }
        catch (e) {
            res.json(e.message);
        }
    },

    createUserBodyValidMW: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    },

    updateUserBodyValidMW: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
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
