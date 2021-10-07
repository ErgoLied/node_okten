const {Schema, model} = require('mongoose');

const carSchema = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        min: 1885,
        max: 1980,
        required: true
    },
    price: {
        type: Number,
        min: 1,
        required: true
    }
}, {timestamps: true});

module.exports = model('car', carSchema);
