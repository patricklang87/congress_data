const mongoose = require('mongoose');

const user = new mongoose.Schema({
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
        default: {subjects: [], legislators: {senators: [], congresspeople: []}}
    }
});

module.exports = mongoose.model("User", user);
