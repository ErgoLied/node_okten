const User = require('../database/User');
const passService = require('../services/password.service');
const ErrorHandler = require('../errors/ErrorHandler');
const {authValidator} = require('../validators');

module.exports = {
    authorizationMW: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User
                .findOne({email})
                .select('+password')
                .lean();

            if(!user){
                throw new ErrorHandler('Wrong email or password', 400);
            }

            await passService.compare(password, user.password);

            req.body=user;
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    },

    authBodyValidMW: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidate.validate(req.body);

            if (error) {
                throw new ErrorHandler('Wrong email or password', 400);
            }

            req.body = value;
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
