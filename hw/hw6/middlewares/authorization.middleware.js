const User = require('../database/User');
const OAuth = require('../database/OAuth');
const {passService, jwtService} = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');
const tokenType = require('../configs/tokenType.enum');
const {AUTHORIZATION} = require('../configs/constants');
const {authValidator} = require('../validators');

module.exports = {
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
    },

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

            req.user = user;
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if(!token){
                throw new ErrorHandler('invalid token', 401);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await OAuth.findOne({access_token: token}).populate('user_id');

            if(!tokenResponse){
                throw new ErrorHandler('invalid token', 401);
            }

            req.user = tokenResponse.user_id;
            req.token = tokenResponse.access_token;

            next();
        }
        catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if(!token){
                throw new ErrorHandler('invalid token', 401);
            }

            await jwtService.verifyToken(token, tokenType.REFRESH);

            const tokenResponse = await OAuth.findOne({refresh_token: token}).populate('user_id');

            if(!tokenResponse){
                throw new ErrorHandler('invalid token', 401);
            }

            await OAuth.deleteOne({refresh_token: token});

            req.user = tokenResponse.user_id;

            next();
        }
        catch (e) {
            next(e);
        }
    }
};
