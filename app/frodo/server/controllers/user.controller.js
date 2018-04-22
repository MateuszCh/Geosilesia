const User = require('./../models/user'),
      bcrypt = require('bcryptjs'),
      Counter = require('./../models/counter'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      config = require('../../../config');

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username: username})
        .then(user => {
            if(!user) {
                return done(null, false, {message: 'Incorrect username'});
            }
            bcrypt.compare(password, user.password)
                .then(response => {
                    if(!response){
                        return done(null, false, {message: 'Incorrect password'});
                    } else {
                        return done(null, user);
                    }
                })
                .catch(err => done(err));
        })
        .catch(err => {
            return done(err);
        })
}));

module.exports = {
  login(req, res, next){
      passport.authenticate('local', (err, user, info) => {
          if(err) return next(err);
          if(!user) return res.status(401).send(info.message);
          req.logIn(user, err => {
              if(err) return next(err);
              return res.send({username: user.username, id: user.id});
          });
      })(req, res, next);
  },
  logout(req, res, next){
      req.logout();
      res.send('user logged out');
  },
  exist(req, res, next){
      User.findOne({})
          .then(user => res.send(!!user))
          .catch(next);
  },
  createAdmin(){
      User.findOne({})
          .then(user => {
              if(user === null){
                  if(config && config.admin && config.admin.username && config.admin.password){
                      Counter.findOne({})
                          .then(counter => {
                              bcrypt.genSalt(12, (err, salt) => {
                                  bcrypt.hash(config.admin.password, salt, (err, hash) => {
                                      User.create({
                                          username: config.admin.username,
                                          password: hash,
                                          id: counter.counter
                                      }).then(() => {
                                          console.log('User created');
                                          Counter.update(counter, {$inc: {counter: 1}})
                                              .then(() => console.log("Counter incremented"))
                                              .catch(err => console.log(err));
                                      }).catch(err => {
                                          console.log(err);
                                      })
                                  })
                              })
                          })
                          .catch(err => console.log(err));
                  } else {
                      console.log('incorrect config');
                  }
              } else {
                  console.log('user already exists');
              }
          })
          .catch(err => console.log(err));
  }
};


// register(req, res, next){
//   const {user, password} = req.body;
//   req.checkBody('user', 'Name is required').notEmpty();
//   req.checkBody('password', 'Password is required').notEmpty();
//   req.checkBody('confirmationPassword', 'Confirmation password is required').notEmpty();
//   req.checkBody('confirmationPassword', 'Passwords do not match').equals(req.body.password);
//   const errors = req.validationErrors();
//   if(errors){
//       res.status(401).send(errors);
//   } else {
//       bcrypt.genSalt(12, (err, salt) => {
//           bcrypt.hash(password, salt, (err, hash) => {
//               User.create({
//                   user: user,
//                   password: hash
//               })
//                   .then(response => {
//                       res.send(response);
//                   })
//                   .catch(next);
//
//           })
//       });
//   }
// },