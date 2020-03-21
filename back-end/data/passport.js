const LocalStrategy = require('passport-local').Strategy;
const bcrypt=require('bcryptjs');
const User = require('../model/user')
const JWTStrategy   = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const passport = function (passport) {
    
    passport.use('login',
        new LocalStrategy({
            usernameField:'username'
        }, function (username, password, done) {
            User.findOne({'username':username},function(err,user){
                if(err) throw err;
                if(!user){
                    return done(null, false, {message: 'Wrong Username or Password!!!'});
                }
                else{
                    bcrypt.compare(password, user.password, function (err, match) {
                        if(err) throw err;
                        if(match){
                            return done(null,user,{message:'Successfully login!!!'});
                        }
                        else{
                            return done(null,false,{message:'Wrong Username or Password!!!'});
                        }
                    })
                }
            })
        })
    );


    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'jwt_secret'
      }, (jwt_payload, done) => {
        User.findOne({'username':jwt_payload.username}).then(user => {
          return done(null, user)
        }).catch(err => {
          return done(err, false, {
            message: 'Token not matched.'
          })
        })
      }))

}

module.exports=passport;