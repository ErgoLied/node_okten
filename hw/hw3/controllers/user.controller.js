const User = require('../database/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const {userId} = req.params;
            const user = await User.findById(userId);
            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {userId} = req.params;
            await User.findByIdAndUpdate(userId, req.body).then(() => {
                User.findById(userId).then((user) => {
                    res.json(user);
                });
            });
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {userId} = req.params;
            await User.findByIdAndDelete(userId).then((user) => {
                res.json(`${user} user was deleted`);
            });
        } catch (e) {
            res.json(e.message);
        }
    }
};
