const {Schema, model} = require('mongoose');

const {ACTION_TOKEN_TYPE} = require('../configs');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    token_type: {
        type: String,
        required: true,
        enum: Object.values(ACTION_TOKEN_TYPE),
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

ActionTokenSchema.pre('findOne', function(){
    this.populate('user_id');
});

module.exports = model('action_token', ActionTokenSchema);
