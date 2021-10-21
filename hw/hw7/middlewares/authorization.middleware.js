const {OAuth, User} = require('../database');
const {passService, jwtService} = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');
const {CONST, TOKEN_TYPE, ERR_MSG, STATUS_CODE} = require('../configs');
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
                throw new ErrorHandler(ERR_MSG.WRONG_EMAIL_OR_PASSWORD, STATUS_CODE.BAD_REQUEST);
            }

            await passService.compare(password, user.password);

            req.user = user;
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
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(CONST.AUTHORIZATION);

            if(!token){
                throw new ErrorHandler(ERR_MSG.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await OAuth.findOne({access_token: token}).populate('user_id');

            if(!tokenResponse){
                throw new ErrorHandler(ERR_MSG.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
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
            const token = req.get(CONST.AUTHORIZATION);

            if(!token){
                throw new ErrorHandler(ERR_MSG.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token, TOKEN_TYPE.REFRESH);

            const tokenResponse = await OAuth.findOne({refresh_token: token}).populate('user_id');

            if(!tokenResponse){
                throw new ErrorHandler(ERR_MSG.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
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
