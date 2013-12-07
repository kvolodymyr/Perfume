module.exports = function (app) {
    app.get('/wines', function (req, res) {
        res.send([{ name: 'wine1' }, { name: 'wine2'}]);
    });
    app.get('/wines/:id', function (req, res) {
        res.send({ id: req.params.id, name: "The Name", description: "description" });
    });
};