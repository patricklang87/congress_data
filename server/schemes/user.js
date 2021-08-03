const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    username: {
        type: String,
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

module.exports = mongoose.model("User", user);