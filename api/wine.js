module.exports = function (app) {
    "use strict";

    var models = app.get('models');

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
        models.Test.findAll({ where: ["id <= ?", 2] }).success(function (data) {
            data.forEach(function (item) { item.value = item.value + ' =  ' + (new Date()); })
            res.send(data);
        });

        //models.all(function (data) {
        //    data.forEach(function (item) { item.value = item.value + ' ' + (new Date()); })
        //    res.send(data);
        //})
    });
};