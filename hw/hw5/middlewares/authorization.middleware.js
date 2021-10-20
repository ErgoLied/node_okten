const User = require('../database/User');
const passService = require('../services/password.service');
const ErrorHandler = require('../errors/ErrorHandler');
const {authValidator} = require('../validators');
const {ERR_MSG, STATUS_CODE} = require('../configs');

module.exports = {
    authorizationMW: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User
                .findOne({email})
                .select('+password')
                .lean();

            if(!user){
                throw new ErrorHandler(ERR_MSG.WRONG_EMAIL_OR_PASSWORD, STATUS_CODE.BAD_REQUEST);
            }

            await passService.compare(password, user.password);

            req.body=user;
            next();
        }
        catch (e) {
            next(e);
        }
    },

    authBodyValidMW: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidate.validate(req.body);

            if (error) {
                throw new ErrorHandler(ERR_MSG.WRONG_EMAIL_OR_PASSWORD, STATUS_CODE.BAD_REQUEST);
            }

            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
};
