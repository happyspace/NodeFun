/**
 * Use express router.
 */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
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

dishRouter.route('/:dishId')
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

app.use('/dishes',dishRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});

