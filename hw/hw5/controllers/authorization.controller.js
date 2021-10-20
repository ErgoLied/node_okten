const {userNormalize} = require('../util/user.util');

module.exports = {
    login: (req, res, next) => {
        try {
            const user = req.body;

            const normUser = userNormalize(user);
            res.json(normUser);
        }
        catch (e) {
            next(e);
        }
    }
};
