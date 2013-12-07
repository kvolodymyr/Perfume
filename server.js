#!/bin/env node
//  OpenShift sample Node application
var http    = require('http');
var express = require('express');
var fs      = require('fs');
var path    = require('path');
var nconf   = require('nconf');


/**
 *  Define the application.
 */
var PerfumeWebApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress  = process.env.OPENSHIFT_NODEJS_IP;
        self.port       = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
        self.env_id     = process.env.NODE_ENV || "production";

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };

    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */
    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app = express();

        self.app.nconf      = nconf;
        self.app.nconf.env().file({ file: 'settings.'+self.env_id+'.json' });

        self.app.use(express.errorHandler()); // developement mode
        self.app.set('views', __dirname + '/views');
        self.app.set('view engine', 'jade');
        //    self.app.use(express.favicon());
        //    self.app.use(express.logger('dev'));
        //    self.app.use(express.bodyParser());
        //    self.app.use(express.methodOverride());
        //    self.app.use(express.cookieParser('azure zomg'));
        //    self.app.use(express.session());
        //    self.app.use(everyauth.middleware(app));
        self.app.use(self.app.router);
        self.app.use(require('less-middleware')({ src: __dirname + '/public' }));
        self.app.use(express.static(path.join(__dirname, 'public')));
        self.app.use("/css", express.static(__dirname + "/css"));
        self.app.use("/fonts", express.static(__dirname + "/fonts"));
        self.app.use("/js", express.static(__dirname + "/js"));

        //  Add handlers for the app (from the routes).
        require('./server.rest')(self.app);
        require('./server.routes')(self.app);
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.server = http.createServer(self.app);
        self.server.listen(
            self.port, 
            self.ipaddress, 
            function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new PerfumeWebApp();
zapp.initialize();
zapp.start();

