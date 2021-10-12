const User = require('../database/User');

module.exports = {
    authorizationMW: async (req, res, next) => {
        try {
            const {login, password} = req.body;
            const user = await User.findOne({login});

            if(!user || user.password !== password){
                throw new Error('fail');
            }

            req.body = user;
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
