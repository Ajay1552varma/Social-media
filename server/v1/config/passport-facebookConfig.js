require('dotenv').config();
const passport = require('passport');
const FbUser = require('../models/fbUser.model');
const User = require('../models/user.model');
const FacebookStrategy = require('passport-facebook').Strategy;



passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID ,
    clientSecret: process.env.APP_SECRETE,
    callbackURL: "/auth/facebook/redirect",
    profileFields: ['email','profileUrl','displayName','name','photos']

  },
  async function(accessToken, refreshToken, profile, done) {
    const {id,name,first_name,email} = profile._json
    const stringId = id.toString();
    const username = first_name+"_"+stringId.substring(stringId.length-4)

    try {
    const user = await User.findOne({
        username:username
    });
    if(user){
        done(null,user);
    }
    else{
        const newUser = await User.create({
                        username:username,
                        name:name,
                        email:email,
                        password:accessToken,
                        profilePic:profile.photos[0].value
                    })
        console.log("++++++++ New FB user +++++++");
        done(null, newUser)
    }
    } catch (error) {
        done(error,null)
    }
  }
));