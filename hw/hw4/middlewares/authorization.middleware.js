const User = require('../database/User');
const passService = require('../services/password.service');
const {authValidator} = require('../validators/auth.validator');

module.exports = {
    authorizationMW: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email})
                .select('+password')
                .lean();

            if(!user){
                throw new Error('wrong email or password');
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
            const {error, value} = authValidator.validate(req.body);

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
