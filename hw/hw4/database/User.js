const {Schema, model} = require('mongoose');

const userRoles = require('../configs/user-roles');

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = model('user', userSchema);
