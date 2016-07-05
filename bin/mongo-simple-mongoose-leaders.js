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

var Leaders = require('../models/leaders');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log("Connected correctly to server");

    Leaders.create({
        "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."
    }, (err, leader) => {
        if (err) throw err;
        console.log('leader created!');
        console.log(leader);
        const id = leader._id;

        // get all the dishes
        setTimeout(() => {
            Leaders.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
                .exec((err, promotion) => {
                    if (err) throw err;
                    console.log('Updated leader!');
                    console.log(leader);


                    db.collection('leader').drop(() => {
                        db.close();
                    });
                });
        }, 3000);
    });
});


