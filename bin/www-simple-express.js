/**
 * A very simple express server.
 */

const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(
    (request, response, next) => {
        console.log(request.headers);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('<html><body><h1>Hello World</h1></body></html>');

    }
);

const server = http.createServer(app);

server.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});