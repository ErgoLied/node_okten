const User = require('../database/User');
const passService = require('../services/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().lean();

            users.forEach(user => userUtil.userNormalize(user));

            res.json(users);
        }
        catch (e) {
            res.json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const {userId} = req.params;
            const user = await User.findById(userId).lean();

            const normUser = userUtil.userNormalize(user);
            res.json(normUser);
        }
        catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashPass = await passService.hash(req.body.password);
            const newUser = await User.create({...req.body, password: hashPass});

            res.json(`${newUser.name} was created`);
        }
        catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {userId} = req.params;

            let user = await User.findByIdAndUpdate(userId, {name: req.body.name}, {new: true});

            user = userUtil.userNormalize(user.toObject());

            res.json(user);
        }
        catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {userId} = req.params;
            await User.findByIdAndDelete(userId);

            res.json(`USER ${userId} WAS DELETED`);
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
