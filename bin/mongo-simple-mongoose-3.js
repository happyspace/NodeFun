/**
 * Add sub-models.
 */

/**
 * Another mongoose server using alternate API.
 */

var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('../models/dishes_subSchema');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log("Connected correctly to server");

    Dishes.create({
        name: 'Uthapizza',
        description: 'Test',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            }
        ]
    }, (err, dish) => {
        if(err) throw err;
        console.log('Dish created!');
        console.log(dish);
        const id = dish._id;

        // get all the dishes
        setTimeout(() => {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
                .exec( (err, dish) => {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save((err, dish) => {
                        console.log('Updated Comments!');
                        console.log(dish);


                        db.collection('dishes').drop(() => {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });

});

