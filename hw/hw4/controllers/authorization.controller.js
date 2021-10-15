const {userNormalize} = require('../util/user.util');

module.exports = {
    authorization: (req, res) => {
        try {
            const user = req.body;

            const normUser = userNormalize(user);
            res.json(normUser);
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
