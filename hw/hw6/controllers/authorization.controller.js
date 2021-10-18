const {jwtService} = require('../services');
const {userNormalize} = require('../util/user.util');
const OAuth = require('../database/OAuth');

module.exports = {
    login: async (req, res) => {
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
            res.json(e.message);
        }
    },

    logout: async (req, res) => {
        try {
            const {token} = req;

            await OAuth.findOneAndDelete({access_token: token});

            res.json('Good bye~');
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
