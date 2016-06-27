/**
 * dishes route
 *
 * Please note use of const and arrow functions.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.route('/')
    .all((req,res,next) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })

    .get((req,res,next) => {
        res.end('Will send all the dishes to you!');
    })

    .post((req,res,next) => {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .delete((req,res,next) => {
        res.end('Deleting all dishes');
    });

router.route('/:dishId')
    .all((req,res,next) =>  {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })

    .get((req,res,next) => {
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
    })

    .put((req,res,next) => {
        res.write('Updating the dish: ' + req.params.dishId + '\n');
        res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
    })

    .delete((req,res,next) => {
        res.end('Deleting dish: ' + req.params.dishId);
    });

module.exports = router;
