const {Schema, model} = require('mongoose');

const {passService} = require('../services');
const {USR_ROLE} = require('../configs');

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
        default: USR_ROLE.USER,
        enum: Object.values(USR_ROLE)
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.virtual('fullInfo').get(function() {
    return `${this.name} ${this.role}`;
});

userSchema.statics = {
    async createUserWithHashedPass(user){
        const hashPass = await passService.hash(user.password);

        return this.create({...user, password: hashPass});
    }
};

module.exports = model('user', userSchema);
