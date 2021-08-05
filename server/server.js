if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
// const passportLocal = require('passport-local').Strategy();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');

let router = express.Router();
const auth = require('./routes/auth');
const district = require('./routes/district');
const propublica = require('./routes/propublica');

const app = express();

//CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {console.log("Mongoose is Connected")}
);

//MIDDLEWARES

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);


//ROUTES

app.use('/auth', auth);
app.use('/district', district);
app.use('/propublica', propublica);


app.listen(4000, () => {
    console.log('Serving at Port 4000')
});