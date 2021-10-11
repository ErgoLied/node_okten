const User = require('../database/User');
const passService = require('../services/password.service');
const userUtil = require('../util/user.util');

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
            const user = await User.findById(userId).lean();

            const normUser = userUtil.userNormalize(user);

            res.json(normUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashPass = await passService.hash(req.body.password);
            const user = await User.create({...req.body, password: hashPass});
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
