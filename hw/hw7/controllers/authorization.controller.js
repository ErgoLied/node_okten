const {EMAIL_ACTION} = require('../configs');
const {emailService, jwtService} = require('../services');
const {userNormalize} = require('../util/user.util');
const {OAuth} = require('../database');

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
    }
};
