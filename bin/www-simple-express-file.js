/**
 * Simple express file server.
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});
