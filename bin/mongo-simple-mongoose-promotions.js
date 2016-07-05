/**
 * Promotions server test.
 */

/**
 * Add sub-models.
 */

/**
 * Another mongoose server using alternate API.
 */

var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('../models/promotions');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log("Connected correctly to server");

    Promotions.create({
        "name": "Weekend Grand Buffet",
        "image": "images/buffet.png",
        "label": "New",
        "price": "19.99",
        "description": "Featuring . . ."
    }, (err, promotion) => {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promotion);
        const id = promotion._id;

        // get all the dishes
        setTimeout(() => {
            Promotions.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
                .exec((err, promotion) => {
                    if (err) throw err;
                    console.log('Updated promotion!');
                    console.log(promotion);


                    db.collection('promotion').drop(() => {
                        db.close();
                    });
                });
        }, 3000);
    });
});


