module.exports = function (app) {
    var self = this;

    var Sequelize = require('sequelize');
    var sequelize = new Sequelize(
        app.nconf.get('database:database'),
        app.nconf.get('database:username'),
        app.nconf.get('database:password'),
        {
            logging: true,
            host: app.nconf.get('database:server') || '127.0.0.1',
            port: 3306
            // dialect: 'mysql'
            //, define: {
            //    freezeTableName: true
            //}
        }
    );

    // load models
    var _models = ['Test'];
    _models.forEach(function (model) {
        self[model] = sequelize.import(__dirname + '/' + model);
        // doesn't work why? module.exports[model]
    });

    /* describe relationships
    (function (m) {
    m.PhoneNumber.belongsTo(m.User);
    m.Task.belongsTo(m.User);
    m.User.hasMany(m.Task);
    m.User.hasMany(m.PhoneNumber);
    })(module.exports);*/

    // method
    this.all = function (callback) {
        self.Test.findAll({ where: ["id <= ?", 2] }).success(function (data) {
            callback(data);
        });
    };

    return this;
}