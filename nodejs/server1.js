#!/usr/bin/env node

var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World 2\n');
}).listen(3000);
console.log('Server running at http://localhost:3000/');
