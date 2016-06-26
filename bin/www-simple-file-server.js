/**
 * Simple http server.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

function send404(response, message) {
    console.log('Request for 404 ' + fileUrl);
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<html><body><h1>Error 404: ' + fileUrl +
        ' not a HTML file</h1></body></html>');
}

function send404(response, fileUrl) {
    console.log('Request for 404 ' + fileUrl);
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<html><body><h1>Error 404: ' + fileUrl +
        ' not a HTML file</h1></body></html>');
}

const server = http.createServer(
    (request, response) => {
        console.log(request.headers);
        console.log('Request for ' + request.url + ' by method ' + request.method);
        if(request.method == 'GET') {
            let fileUrl = '';
            if (request.url == '/') {
                fileUrl = '/index.html';
                console.log('Request for ' + fileUrl);
            }
            else {
                fileUrl = request.url;
                console.log('Request for ' + fileUrl);
            }
            let filePath = path.resolve('../public'+fileUrl);
            let fileExt = path.extname(filePath);

            if (fileExt == '.html'){
                fs.exists(filePath, (exists) => {
                    if(exists){
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        fs.createReadStream(filePath).pipe(response);
                    }
                    else {
                        send404(response, + fileUrl +
                            ' not a HTML file');
                    }
                });
            }
            else {
                send404(response, fileUrl +
                    ' not a HTML file');
            }
        }
        else {
            let fileUrl = '';
            send404(response, request.method + ' not supported.');
        }
    }
);



server.listen(port, hostname,
    () => console.log('Server running at http://${hostname}:${port}/')
    );
