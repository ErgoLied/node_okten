const {User} = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const {ERR_MSG, STATUS_CODE} = require('../configs');

module.exports = {
    createUserMW: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new ErrorHandler(ERR_MSG.EXISTING_EMAIL, STATUS_CODE.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdMW: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await User.findOne({_id: userId});

            if (!user) {
                throw new ErrorHandler(ERR_MSG.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValidMW: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, STATUS_CODE.BAD_REQUEST);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArray = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArray.includes(role)) {
                throw new ErrorHandler(ERR_MSG.ACCESS_DENIED, STATUS_CODE.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
