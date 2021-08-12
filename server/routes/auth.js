const express = require('express');
const router = express.Router();
// const User = require('../schemes/user');
const connection = require('../config/database');
const User = connection.models.user;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const authCheck = require('../middlewares/authCheck').checkAuthenticated;

router.post('/register', (req, res, next) => {
    User.findOne({username: req.body.email}, async(err, doc) => {
        if (err) throw err;
        if (doc) res.send("An account already exists for this e-mail address");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                displayname: req.body.displayname,
                username: req.body.email,
                password: hashedPassword
            });

            await newUser.save();
            res.send({email: newUser.email});
        }
    });
});

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.send('login-failure'); }
      req.login(user, (err) => {
        if (err) { return next(err); }
        return res.send({interests: user.interests, email: user.username, displayname: user.displayname});
      });
    })(req, res, next);
  });

// router.post('/login',
//   passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login-success'})
// );

// router.get('/login-success', (req, res, next) => {
//   res.send({interests: req.user.interests, email: req.user.username, displayname: req.user.displayname});
// });

// router.get('/login-failure', (req, res, next) => {
//   res.send('You entered the wrong password.');
// });


router.get('/logout', (req, res, next) => {
    req.logout();
    res.send("logout");
});

router.get('/protected-route', authCheck, (req, res, next) => {
    res.send({msg: "secret message"});
});


module.exports = router;