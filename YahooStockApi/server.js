const http = require('http');
var url = require("url");
var fs = require("fs");

var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;
    switch(path) {
        // case '/':
        //     response.writeHead(200, {
        //         'Conent-Type' : 'text/plain'
        //     });
        //     response.write("This is a test message");
        //     response.end();
        //     break;
        case '/index.html':
            fs.readFile(__dirname + path, function(error, data) {
                if(error) {
                    console.log("hello");
                    console.log(error);
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Conent-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("oops this doens't exist - 404");
            response.end();
            break;
    }
});

server.listen(8082);

// const express = require('express');

// const HOST = '0.0.0.0';
// const PORT = 8080;

// const app = express();
// app.get('/', (req, res) => {
//     res.send('Hello World\n');
// });

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);