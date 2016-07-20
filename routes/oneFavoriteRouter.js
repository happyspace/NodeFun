/**
 * first review....
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());


// ROUTE - DEFAULT

favoriteRouter.route('/')

    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {

        Favorites.find({})
            .populate('postedBy', 'dishes')
            .exec(function (err, favorite) {
                if (err) throw err;
                res.json(favorite);
            });
    })

    .post(function (req, res, next) {
        Favorites.create(req.body, function (err, favorite) {
            if (err) throw err;

            req.body.postedBy = req.decoded._doc._id;

            favorite.dishes.push(req.body);

            console.log("Favorite created");
            var id = favorite._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the dish with id: ' + id);

        });
    })

    .delete(function (req, res, next) {
        Favorites.remove({}, function (err, resp) {
            if (err) throw err;

            res.json(resp);

        });
    });


// ROUTE - FAVORITE ID

favoriteRouter.route('/:dishObjectId')

    .all(Verify.verifyOrdinaryUser)

    .delete(function (req, res, next) {

        Favorites.remove(req.params.dishObjectId, function (err, resp) {
            if (err) throw err;

            res.json(resp);
        });
    });
















