/**
 * promotions route
 *
 * Please note use of const and arrow functions.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 */


const express = require('express');
const promoRouter = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Verify = require('./verify');

const Promos = require('../models/promotions');

promoRouter.use(bodyParser.json());

promoRouter.route('/')

    .get(Verify.verifyOrdinaryUser, (req,res,next) => {
        Promos.find({}, (err, promo) => {
            if(err) throw err;
            res.json(promo);
        })
    })

    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req,res,next) => {
        Promos.create(req.body, (err, promo) => {
            if (err) throw err;
            let id = promo._id;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Added the promo with id: ' + id);
        });    
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req,res,next) => {
        Promos.remove({}, (err, resp) => {
            if(err) throw err;
            res.json(resp);
        });
    });

promoRouter.route('/:promotionId')

    .get(Verify.verifyOrdinaryUser, (req,res,next) => {
        Promos.findById(req.params.promotionId, (err, promo) => {
            if(err) throw err;
            res.json(promo);
        });    })

    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req,res,next) => {
        Promos.findByIdAndUpdate(req.params.promotionId,
            { $set: req.body},
            { new: true },
            (err, promotion) => {
                if (err) throw err;
                res.json(promotion);
            });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req,res,next) => {
        Promos.remove(req.params.promotionId, (err, resp) => {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = promoRouter;
