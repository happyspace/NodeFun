/**
 * Favorites Schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Favorite = new Schema(
    {
        favoredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        dishes: [
            {type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish',
            unique: true}
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Favorite', Favorite);
