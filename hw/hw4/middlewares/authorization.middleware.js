const User = require('../database/User');
const passService = require("../services/password.service");

module.exports = {
    authorizationMW: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email}).lean();

            if(!user){
                throw new Error('fail');
            }

            await passService.compare(password, user.password);

            req.body=user;
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
