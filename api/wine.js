// var mysql = require('mysql');

module.exports = function (app) {
    //var client = mysql.createConnection({ 
    //    user: app.nconf.get('database:username'),  
    //    password: app.nconf.get('database:password'), 
    //    database: app.nconf.get('database:database')});

    var models = require("../models/models")(app);
    app.get('/wines', function (req, res) {
        res.send([
            { name: 'wine1' },
            { name: 'wine2' }
            , { name: '-' + app.nconf.get('recaptcha:privateKey') }
        ]);
    });
    app.get('/wines/:id', function (req, res) {
        res.send({ id: req.params.id, name: "The Name", description: "description", key: 1 });
    });
    app.get('/cfg', function (req, res) {
        res.send({  
            server: app.nconf.get('database:server'),
            database: app.nconf.get('database:database')
        });
    });
    app.get('/test', function (req, res) {
        models.all(function (data) { 
            res.send(data);
        })
        // http://nodejsrocks.blogspot.com/2012/04/nodejs-expressjs-mysql.html
        //client.query("select * from test where id >= ?",[2], function(err, details, fields) {
        //    res.send(err|details);
        //});
    });
};