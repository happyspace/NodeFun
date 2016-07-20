/**
 * Favorites Route.
 *
 * Please note use of const and arrow functions.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 */

const express = require('express');
const favoriteRouter = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Verify = require('./verify');

const Dishes = require('../models/dishes');
const Favorites = require('../models/favorites');

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get((req, res, next) => {
        // find the favorites document for the user if there is one.
        // returns empty array if there is no favorites document.
        Favorites.find({'favoredBy': req.decoded._doc._id})
            .populate(['favoredBy', 'dishes'])
            .exec ( (err, favorite) => {
                if (err) throw err;
                res.json(favorite);
            } );
    })
    .post((req, res, next) => {
        // find the favorites document for the user if there is one.
        // returns null if there is no document.
        Favorites.findOne({'favoredBy': req.decoded._doc._id}, (err, favorite) => {
            if (err) throw err;
            if(favorite){
                // check that the dish has not been faved.
                // may wish to do two queries.
                // convert object id(bson) to string and compare.
                let exists = favorite.dishes.find(oid => {
                    if(oid && oid.toString() === req.body._id){
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                if(!exists) {
                    favorite.dishes.push(req.body._id);
                    favorite.save((err, favorite) => {
                        if (err) throw err;
                        console.log('Updated Favorites!');
                        res.json(favorite);
                    });
                }
                else {
                    console.log('Dish !' + req.body._id + " is in favs.");
                }
            }
            // create a new favorite document.
            else {
                let fav = new Favorites( {'favoredBy': req.decoded._doc._id,
                    'dishes': [req.body._id]}) ;
                fav.save(
                    (err, favorite) => {
                        if (err) throw err;
                        console.log('Created Favorites!');
                        res.json(favorite);
                });
            }
        } );
        }

    )
    .delete((req, res, next) => {
        // find the favorites document for the user if there is one.
        // returns null if there is no document.
        Favorites.findOne({'favoredBy': req.decoded._doc._id}, (err, favorite) => {
            if (err) throw err;
            // if there is a document remove it from the collection.
            if(favorite){
                Favorites.remove(favorite, (err, resp) => {
                    if (err) throw err;
                    res.json(resp);
                });
            }
        } );
    });
favoriteRouter.route('/:dishId')
    .all(Verify.verifyOrdinaryUser)
    .delete((req, res, next) => {
        Favorites.findOne({'favoredBy': req.decoded._doc._id}, (err, favorite) => {
            if (err) throw err;
            if (favorite) {
                // filter out the dish if it is in the collection.
                let filter = favorite.dishes.filter(oid => {
                    if(oid && oid.toString() !== req.params.dishId){
                        return true;
                    }
                });
                favorite.dishes = filter;
                favorite.save( (err, result) => {
                    if (err) throw err;
                    res.json(result);
                })
            }
        });
    });



module.exports = favoriteRouter;