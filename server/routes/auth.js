const express = require('express');
const router = express.Router();
const User = require('../schemes/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.post('/register', (req, res, next) => {
    User.findOne({username: req.body.email}, async(err, doc) => {
        if (err) throw err;
        if (doc) res.send("An account already exists for this e-mail address");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword
            });

            await newUser.save();
            res.send({email: newUser.email});
        }
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No user exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send({username: user.username, email: user.email});
            });
        }
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send("logged out");
})


module.exports = router;