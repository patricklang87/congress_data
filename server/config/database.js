const mongoose = require('mongoose');
const { UserSchema } = require('../schemes/user');

require('dotenv').config();

const conn = process.env.DB_CONNECT;

const connection = mongoose
    .createConnection(conn,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => {console.log("Connected to DB")}
    );

const User = connection.model('user', UserSchema);

module.exports = connection;