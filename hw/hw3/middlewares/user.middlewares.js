const User = require('../database/User');

module.exports = {
    createUserMW: async (req, res, next) => {
        try{
            const {login} = req.body;
            const userLogin = await User.findOne({login});
            if(userLogin){
                throw new Error('this login already exists!');
            }
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    },

    isUserByIdMW: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await User.findOne({_id: userId});
            if(!user){
                throw new Error('we havn\'t user with id like this');
            }
            next();
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
