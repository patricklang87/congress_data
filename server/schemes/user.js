const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    interests: {
        type: Object,
        default: {subjects: [], legislators: []}
    }
});

module.exports = { UserSchema } ;