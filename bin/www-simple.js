/**
 * Simple http server.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;


const server = http.createServer(
    (request, response) => {
        console.log(request.headers);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('<html><body><h1>Hello World</h1></body></html>');
    }
);

server.listen(port, hostname,
    () => console.log('Server running at http://${hostname}:${port}/')
    );
