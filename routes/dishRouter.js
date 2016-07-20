/**
 * dishes route
 *
 * Please note use of const and arrow functions.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 */

const express = require('express');
const dishRouter = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Verify = require('./verify');

const Dishes = require('../models/dishes');

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(Verify.verifyOrdinaryUser, (req,res,next) => {
        Dishes.find({})
            .populate('comments.postedBy')
            .exec( (err, dish) => {
            if(err) throw err;
            res.json(dish);
        });
    })

    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req,res,next) => {
        Dishes.create(req.body, (err, dish) => {
            if (err) throw err;
            let id = dish._id;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Added the dish with id: ' + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req,res,next) => {
        Dishes.remove({}, (err, resp) => {
            if(err) throw err;
            res.json(resp);
        });
    });

dishRouter.route('/:dishId')
    .get((req,res,next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec( (err, dish) => {
            if(err) throw err;
            res.json(dish);
        });
    })

    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId,
            { $set: req.body},
            { new: true },
            (err, dish) => {
                if (err) throw err;
                res.json(dish);
        });
    })

    .delete((req,res,next) => {
        Dishes.remove(req.params.dishId, (err, resp) => {
            if (err) throw err;
            res.json(resp);
        });
    });

dishRouter.route('/:dishId/comments')
    .all(Verify.verifyOrdinaryUser)
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec ((err, dish) => {
                if (err) throw err;
                res.json(dish.comments);
        });
    })
    .post((req, res, next) => {
        Dishes.findById(req.params.dishId, (err, dish) => {
            if (err) throw err;
            req.body.postedBy = req.decoded._doc._id;
            dish.comments.push(req.body);
            dish.save((err, dish) => {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            });
        })


    })
    .delete (Verify.verifyAdmin, (req, res, next) => {
            Dishes.findById(req.params.dishId, (err, dish) => {
                if (err) throw err;
                for (let i = (dish.comments.length - 1); i >=0; i--){
                    dish.comments.id(dish.comments[i]._id).remove();
                }
                dish.save(function (err, result) {
                    if (err) throw err;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Deleted all comments!');
                });
            });
    });

dishRouter.route('/:dishId/comments/:commentId')
    .all(Verify.verifyOrdinaryUser)
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId, (err, dish) => {
            if (err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        })
    })
    .put((req, res, next) => {
        // We delete the existing comment and insert the updated
        // comment as a new comment
        Dishes.findById(req.params.dishId, (err, dish) => {
            if (err) throw err;
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            });
        });
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(dish.comments.id(req.params.commentId).postedBy
                != req.decoded._doc._id) {
                let err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }

            dish.comments.id(req.params.commentId).remove();
            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });

module.exports = dishRouter;
