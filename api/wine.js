module.exports = function (app) {
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
    app.get('/test', function (req, res) {
        models.all(function (data) { 
            res.send(data);
        })
    });
};