#!/bin/env node
//  OpenShift sample Node application
var http = require('http');
var express = require('express');
var fs      = require('fs');

function on_start(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("Hello, world!")
}

var server = http.createServer(on_start);
// var server = express.createServer(on_start);
server.listen(process.env.PORT);
