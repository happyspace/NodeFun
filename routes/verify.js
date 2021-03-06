/**
 * Verify user jwt token.
 */

const User = require('../models/user');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config.js');

exports.getToken = (user) => {
    console.log(user);
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

exports.verifyOrdinaryUser = (req, res, next) => {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                let err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        let err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = (req, res, next) => {
    if (req.decoded._doc.admin === true){
        next();
    }
    else {
        let err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};


