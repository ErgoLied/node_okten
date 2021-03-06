const {User, OAuth} = require('../database');
const {emailService} = require('../services');
const userUtil = require('../util/user.util');
const {EMAIL_ACTION, STATUS_CODE} = require('../configs');

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
            const user = await User.createUserWithHashedPass(req.body);

            const normUser = userUtil.userNormalize(user.toObject());

            await emailService.sendMail(normUser.email, EMAIL_ACTION.WELCOME, {userName: normUser.name});

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

            await emailService.sendMail(user.email, EMAIL_ACTION.UPDATE_USER, {userName: user.name});

            res.status(STATUS_CODE.CREATED).json(user);
        }
        catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await User.findByIdAndDelete(userId);
            await OAuth.deleteMany({user_iD: userId});

            await emailService.sendMail(user.email, EMAIL_ACTION.DELETE_USER, {userName: user.name});

            res.sendStatus(STATUS_CODE.NO_CONTENT);
        }
        catch (e) {
            next(e);
        }
    }
};
