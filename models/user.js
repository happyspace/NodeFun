/**
 * Users schema using passport-local-mongoose
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
        username: String,
        password: String,
        OauthId: {
            type: String,
            default: ''
        },
        OauthToken: {
            type: String,
            default: ''
        },
        firstname: {
            type: String,
            default: ''
        },
        lastname: {
            type: String,
            default: ''
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    });

User.plugin(passportLocalMongoose);

User.methods.getName = () => {
    return (this.firstname + ' ' + this.lastname);
};

module.exports = mongoose.model('User', User);
