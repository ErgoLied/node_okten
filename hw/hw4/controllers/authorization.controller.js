const User = require('../database/User');

module.exports = {
    authorization: async (req, res) => {
        try {
            const{login} = req.body;
            await User.find({login});
            res.json('OK');
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
