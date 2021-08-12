if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const session = require('express-session');

// let router = express.Router();
// const auth = require('./routes/auth');
// const district = require('./routes/district');
// const propublica = require('./routes/propublica');
// const userData = require('./routes/userData');
// const connection = require('./config/database');

const MongoStore = require('connect-mongo');

require('./config/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//CONNECT TO DB
const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_CONNECT,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));


app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);


require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log("session", req.session);
    console.log('user', req.user);
    next();
})



//ROUTES

app.use('/auth', auth);
app.use('/district', district);
app.use('/propublica', propublica);
app.use('/userData', userData);



app.listen(4000, () => {
    console.log('Serving at Port 4000')
});