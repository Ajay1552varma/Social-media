require('dotenv').config();
const User = require('../models/user.model');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const FbUser = require('../models/fbUser.model');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRETE;


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        // console.log(jwt_payload);
        const id = jwt_payload.userId
        const isFb = jwt_payload.isFb
        // console.log(isFb);
        if(!isFb){
            User.findById(id, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }
        else{
            User.findById(id,function(err,user){
                if(err){
                    return(err,false);
                }
                if(user){
                    return done(null, user)
                }else{
                    return done(null,false);
                }
            })
        }
    }));


