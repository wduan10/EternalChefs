const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    initial_payment:  {
        type: Date,
        default: null
    },
    payments: {
        type: Number,
        default: 0
    }
});

module.exports = Item = mongoose.model('user', UserSchema);