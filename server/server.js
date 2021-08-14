const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('./schemes/user');
require('dotenv').config();

//import routes:
const auth = require('./routes/auth');
const district = require('./routes/district');
const propublica = require ('./routes/propublica');
const userData = require('./routes/userData');

const app = express();

mongoose.connect(
    process.env.DB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {console.log("Mongoose is Connected");}
);

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);

//routes
app.use('/auth', auth);
app.use('/district', district);
app.use('/propublica', propublica);
app.use('/userData', userData);

app.listen(4000, () => {
    console.log("Listening on Port 4000")
});
