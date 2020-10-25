const bcrypt = require('bcrypt');
const { User } = require('../../db.js');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const config = require('../config.js');

module.exports = function (passport) {
    passport.use(
      new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async function(email, password, done) {
    try{  
     const user = await User.findOne({where: { email: email }})
        
        if (!user) {return done(null, false, {message: 'Incorrect username'}); }
        if (!bcrypt.compareSync(password, user.password)) { return done(null, false, {message: 'Incorrect password'}); }
        return done(null, user);

    } catch (error) {
      return done(error); 
    }
  }))

  passport.serializeUser(function(user, done) {
    // console.log('serializacion', user.id)
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findByPk(id).then((user,err) => {
      // console.log('deserializacion', user)
      done(err, user)
    });
  });

//===============================================
//     Estrategia de Google
//===============================================
    passport.use(new GoogleStrategy({
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret,
      callbackURL: config.googleAuth.callbackURL,
      // passReqToCallback: true
      proxy: true
      },
      function(token, refreshToken, profile, done) {
          process.nextTick(async function() {
              const user = profile._json;
              console.log(user);
              const password = 'HenryMov2.0!';   
              const birthdate = new Date('2000/10/10');
              User.findOrCreate({
                  where: { email: user.email },
                  defaults: {
                      name: user.given_name,
                      lastname: user.family_name,                      
                      email: user.email,
                      password: password,
                      phone: '0000000000',
                      birthdate: birthdate,
                      image: user.picture
                  }
              })
              .then(res => res[0])
              .then(user => {
                  done(null, user);
              })
              .catch(err => done(err));
          });
      }            
  ));

//===============================================
//     Estrategia de GitHub
//===============================================
  passport.use(new GitHubStrategy({
      clientID: config.githubAuth.clientID,
      clientSecret: config.githubAuth.clientSecret,
      callbackURL: config.githubAuth.callbackURL,
      // passReqToCallback: true,
      },
      function(accessToken, refreshToken, profile, done) {
          process.nextTick(async function() {      
            console.log('datosssss: ', profile);  
              const user = profile;
              const password = 'HenryMov2.0!';   
              const birthdate = new Date('1988/03/15');               
              User.findOrCreate({
                  where: { email: user.emails[0].value },
                  defaults: {
                      name: 'Diego',
                      lastname: 'Tolaba',
                      email: user.emails[0].value,
                      password: password,
                      phone: '3884137079',
                      birthdate: birthdate,
                      image: user.photos[0].value
                  }
              })
              .then(res => res[0])
              .then(user => {
                  done(null, user);
              })
              .catch(err => done(err));            
          });
      }
  ));
}

