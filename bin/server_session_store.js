/**
 * Create a simple Express server with Express router. 
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

const hostname = 'localhost';
const port = 3000;


let app = express();

app.use(morgan('dev'));
app.use(session({
    name: 'session_id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));

function auth(req, res, next) {
    console.log(req.headers);

    if (!req.session.user) {
        let authHeader = req.headers.authorization;
        if (!authHeader) {
            let err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }

        let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        let user = auth[0];
        let pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            req.session.user = 'admin';
            next(); // authorized
        } else {
            let err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
    else {
        if(req.session.user == 'admin') {
            console.log('req.session: ',req.session);
            next();
        } else {
            let err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }


}

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

console.log(__dirname);

app.use(auth);

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(function(err,req,res,next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});


