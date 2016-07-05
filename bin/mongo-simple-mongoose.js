/**
 * A simple mongoose server.
 */

const mongoose = require('mongoose');
const assert = require('assert');

const Dishes = require('../models/dishes_simple');

const url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    let newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test'
    });

    newDish.save( (err) => {
        if (err) throw err;
        console.log('Dish created!');

        //noinspection JSUnresolvedFunction
        Dishes.find({}, (err, dishes) => {
            if (err) throw err;

            // object of all the users
            console.log(dishes);
            db.collection('dishes').drop(
                () => {db.close();}
            )
        });
    });
});



