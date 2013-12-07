// Node.js entry point
var http = require('http')
,   express = require('express')
,   nconf = require('nconf')
,   path = require('path')
,   mysql = require('mysql');
// ,   everyauth = require('everyauth');

/**
* CONFIGURATION
* -------------------------------------------------------------------------------------------------
* load configuration settings from ENV, then settings.json.  Contains keys for OAuth logins. See 
* settings.example.json.  
*
* nconf.env().file({ file: 'settings.json' });
**/

var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.errorHandler()); // developement mode
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
//    app.use(express.favicon());
//    app.use(express.logger('dev'));
//    app.use(express.bodyParser());
//    app.use(express.methodOverride());
//    app.use(express.cookieParser('azure zomg'));
//    app.use(express.session());
//    app.use(everyauth.middleware(app));
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use("/css", express.static(__dirname + "/css"));
    app.use("/fonts", express.static(__dirname + "/fonts"));
    app.use("/js", express.static(__dirname + "/js"));
});

/**
* ROUTING
* -------------------------------------------------------------------------------------------------
* include a route file for each major area of functionality in the site
**/
require('./server.rest')(app);
require('./server.routes')(app);

var server = http.createServer(app);
/*
var server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello, world " + new Date() + "!")
});
*/

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});