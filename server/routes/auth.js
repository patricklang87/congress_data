const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../schemes/user');
const { isAuth } = require('../middlewares/isAuth');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', (req, res, next) => {
    //register validation
    const { error } = registerValidation(req.body);
    if (error) {
      let message = error.details[0].message.replace("length", "").replace("password", "Password").replace("username", "Email") + '.';
      return res.send({msg: message});
    }

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

router.post('/login', (req, res, next) => {
  //login validation
  const { error } = loginValidation(req.body);
  if (error) {
    let message = error.details[0].message.replace("length", "").replace("password", "Password").replace("username", "Email") + '.';
    return res.send({msg: message});
  }

  passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send({msg: "Login Error. Check Username and Password."});
      else {
          req.logIn(user, (err) => {
              if (err) throw err;
              res.send({msg: "Login Successful!", username: req.user.username, interests: req.user.interests, bookmarks: req.user.bookmarks});    
          });
      }
  })(req, res, next);
});

router.get('/user', (req, res, next) => {
  res.send(req.user)
});

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.send({msg: "Logout Successful!"});
})

router.get('/protected-route', isAuth, (req, res, next) => {
  res.send('hemlige dokument!')
})


module.exports = router;