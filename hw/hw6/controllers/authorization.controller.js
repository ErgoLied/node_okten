const {jwtService} = require('../services');
const {userNormalize} = require('../util/user.util');
const {OAuth} = require('../database');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const normUser = userNormalize(user);

            await OAuth.create({...tokenPair, user_id: normUser._id});

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

            await OAuth.deleteOne({access_token: token});

            res.json('Good bye~');
        }
        catch (e) {
            next(e);
        }
    }
};
