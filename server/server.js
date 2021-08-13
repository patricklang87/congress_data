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

const app = express();

mongoose.connect(
    'mongodb+srv://pslang:pslang123@cluster0.d10w1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
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
        secret: "secretcode",
        resave: true,
        saveUninitialized: true
    })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);

const isAuth = (req ,res, next) => {
    console.log(req)
    if (req.user) {
        return next();
    }
    res.send('Not Authenticated');
}

//routes
app.post('/register', (req, res, next) => {
    console.log("register", req.body);
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send({msg: "User Already Exists."});
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            });

            await newUser.save();
            res.send({msg: "New User Created!"});
        }
    })
    
});

app.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send({msg: "User Does Not Exist."});
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                console.log(req.user);
                res.send({msg: "Login Successful!", username: req.user.username, interests: req.user.interests});    
            });
        }
    })(req, res, next);
});

app.get('/user', (req, res, next) => {
    res.send(req.user)
});

app.get('/logout', (req, res, next) => {
    req.logOut();
    res.send({msg: "Logout Successful!"});
})

app.get('/protected-route', isAuth, (req, res, next) => {
    res.send('hemlige dokument!')
})

app.listen(4000, () => {
    console.log("Listening on Port 4000")
});
