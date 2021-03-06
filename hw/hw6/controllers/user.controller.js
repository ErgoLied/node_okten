const {User} = require('../database');
const {passService} = require('../services');
const userUtil = require('../util/user.util');
const {STATUS_CODE} = require('../configs');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find().lean();

            users.forEach(user => userUtil.userNormalize(user));

            res.json(users);
        }
        catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const {user} = req;

            const normUser = userUtil.userNormalize(user);
            res.json(normUser);
        }
        catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPass = await passService.hash(req.body.password);
            await User.create({...req.body, password: hashPass});

            const user = await User.findOne({email: req.body.email}).lean();
            const normUser = userUtil.userNormalize(user);

            res.status(STATUS_CODE.CREATED).json(normUser);
        }
        catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            let user = await User.findByIdAndUpdate(userId, {name: req.body.name}, {new: true});

            user = userUtil.userNormalize(user.toObject());

            res.status(STATUS_CODE.CREATED).json(user);
        }
        catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            await User.findByIdAndDelete(userId);

            res.sendStatus(STATUS_CODE.NO_CONTENT);
        }
        catch (e) {
            next(e);
        }
    }
};
