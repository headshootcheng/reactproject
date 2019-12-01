const LocalStrategy = require('passport-local').Strategy;
const bcrypt=require('bcryptjs');
const User = require('../model/user')
//const jwt = require('jsonwebtoken')
//const JWTStrategy   = require('passport-jwt').Strategy
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
    
    passport.serializeUser(
        function (user, done) {
            done(null, user.username);
        });

    passport.deserializeUser(
        function (username, done) {
            User.findOne(username, function (err, result) {
                done(err, result);            
            });
            
        });

}

module.exports=passport;