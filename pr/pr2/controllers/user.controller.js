const db = require('../database/users');

module.exports = {
    getUsers: (req, res) => {
        res.json(db);
    },

    getUserById: (req, res) => {
        const {userId} = req.params;
        const user = db[userId-1];
        res.json({user});
    },

    createUser: (req, res) => {
        db.push({id: db.length+1, ...req.body});
        res.json(db);
    },

    deleteUser: (req, res) => {
        const {userId} = req.params;
        const user = db.find(value => value.id === user.id);
        db.splice(delUser.id-1, 1);
        res.json(db);
    }
};