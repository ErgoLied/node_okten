const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = model('user', userSchema);
