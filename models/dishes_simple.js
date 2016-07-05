/**
 * Simple schema for dishes.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true});

// the schema is useless so far
// we need to create a model using it
let Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;
