/**
 * Add authentication here.
 */

const passport = require('passport');

const User = require('../models/user');
const config = require('../config');

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const facebookOptions = {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
};

exports.facebook = passport.use(
    new FacebookStrategy(facebookOptions,
        (accessToken, refreshToken, profile, done) => {
            User.findOne(
                {OauthId: profile.id},
                (err, user) => {
                    if(err) {
                        console.log(err); // handle errors!
                    }
                    if(!err && user !== null){
                        done(null, user);
                    }
                    else {
                        user = new User({
                            username: profile.displayName
                        });
                        user.OauthId = profile.id;
                        user.OauthToken = accessToken;

                        user.save(err => {
                            if(err) {
                                console.log(err); // handle errors!
                            }
                            else {
                                console.log("saving user ...");
                                done(null, user);
                            }
                        });
                    }
                }
            );
        }
    )
);