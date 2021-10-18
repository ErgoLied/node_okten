const User = require('../database/User');
const {userValidator} = require('../validators');

module.exports = {
    createUserMW: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userEmail = await User.findOne({email});

            if (userEmail) {
                return next({
                    message: 'this email already exists!',
                    status: 400
                });
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserByIdMW: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await User.findOne({_id: userId});

            if (!user) {
                return next({
                    message: 'user not found',
                    status: 404
                });
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    createUserBodyValidMW: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                return next({
                    message: error.details[0].message,
                    status: 400
                });
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUserBodyValidMW: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                return next({
                    message: error.details[0].message,
                    status: 400
                });
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkUserRole: (roleArray = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArray.includes(role)) {
                next({
                    message: 'Access denied',
                    status: 400
                });
                return;
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
