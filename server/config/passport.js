const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.user;
const bcrypt = require("bcryptjs");

// const verifyCallback = (username, password, done) => {
//     User.findOne({ username: username }, (err, user) => {
//         if (err) throw err;
//         if (!user) return done(null, false, {message: "Incorrect Username"});
//         bcrypt.compare(password, user.password, 
//          (err, result) => {
//              if (err) throw err;
//              if (result === true) {
//                  return done(null, user);
//              } else {
//                  return done(null, false);
//              }
//          });
//     });
// }

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username }).
      then(async (user) => {
          if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
          }
          const isValid = await bcrypt.compare(password, user.password);
          console.log("bcrypt", isValid);

          if (isValid) {
            console.log('user vaildation', user);
              return done(null, user);
          } else {
              return done(null, false);
          }                  
      })
      .catch((err) => {
          done(err);
      });
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });







