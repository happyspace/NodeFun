/**
 * leader route
 *
 * Please note use of const and arrow functions.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 */
 

const express = require('express');
const leaderRouter = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

    .get((req,res,next) => {
        Leaders.find({}, (err, dish) => {
            if(err) throw err;
            res.json(dish);
        })
    })

    .post((req,res,next) => {
        Leaders.create(req.body, (err, leader) => {
            if (err) throw err;
            let id = leader._id;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Added the dish with id: ' + id);
        });
    })

    .delete((req,res,next) => {
        Leaders.remove({}, (err, resp) => {
            if(err) throw err;
            res.json(resp);
        });
    });

leaderRouter.route('/:leaderId')

    .get((req,res,next) => {
        Leaders.findById(req.params.leaderId, (err, leader) => {
            if(err) throw err;
            res.json(leader);
        });
    })

    .put((req,res,next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId,
            { $set: req.body},
            { new: true },
            (err, leader) => {
                if (err) throw err;
                res.json(leader);
            });
    })

    .delete((req,res,next) => {
        Leaders.remove(req.params.leaderId, (err, resp) => {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = leaderRouter;
