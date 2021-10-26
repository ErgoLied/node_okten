const ErrorHandler = require('../errors/ErrorHandler');
const {EMAIL_ACTION, ERR_MSG, STATUS_CODE, TOKEN_TYPE, ACTION_TOKEN_TYPE, CONFIG, CONST} = require('../configs');
const {emailService, passService, jwtService} = require('../services');
const {userNormalize} = require('../util/user.util');
const {OAuth, User, ActionToken} = require('../database');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const normUser = userNormalize(user);

            await OAuth.create({...tokenPair, user_id: normUser._id});

            await emailService.sendMail(user.email, EMAIL_ACTION.LOG_IN, {userName: normUser.name});

            res.json({
                user: normUser,
                ...tokenPair
            });
        }
        catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {token} = req;

            const user = await OAuth.findOneAndDelete({access_token: token}).populate('user_id');
            const {name, email} = user.user_id;

            await emailService.sendMail(email, EMAIL_ACTION.LOG_OUT, {userName: name});

            res.json('Good bye~');
        }
        catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler(ERR_MSG.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
            }

            const actionToken = jwtService.generateActionToken(ACTION_TOKEN_TYPE.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: ACTION_TOKEN_TYPE.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                EMAIL_ACTION.FORGOT_PASSWORD,
                {forgotPasswordUrl: CONFIG.FRONT_URL + `/passwordForgot?token=${actionToken}`}
            );

            res.json('Ok');
        }
        catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterRefresh: async (req, res, next) => {
        try {
            const actionToken = req.get(CONST.AUTHORIZATION);
            const {newPassword} = req.body;

            if(!actionToken){
                throw new ErrorHandler(ERR_MSG.INVALID_TOKEN, STATUS_CODE.BAD_REQUEST);
            }

            await jwtService.verifyToken(actionToken, TOKEN_TYPE.ACTION);

            const tokenResponse = await ActionToken.findOneAndDelete({
                token: actionToken,
                token_type: ACTION_TOKEN_TYPE.FORGOT_PASSWORD
            });

            if(!tokenResponse){
                throw new ErrorHandler(ERR_MSG.INVALID_TOKEN, STATUS_CODE.BAD_REQUEST);
            }

            const user = tokenResponse.user_id;

            await OAuth.deleteMany({user_id: user._id});

            const hashPassword = await passService.hash(newPassword);

            await User.findByIdAndUpdate({_id: user._id}, {password: hashPassword});

            res.status(STATUS_CODE.CREATED).json('Password successful updated');
        }
        catch (e) {
            next(e);
        }
    }
};
