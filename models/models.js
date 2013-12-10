// http://sequelizejs.com/documentation
// some ideas
// how to save config - http://stackoverflow.com/questions/18313203/route-structure-in-nodejs-expressjs
// how to organize modules - http://stackoverflow.com/questions/16991798/sequelize-define-error-has-no-method-define-in-nodejs
var Sequelize = require("sequelize");

module.exports = function (app) {
    getInstance = function () {
        return new Sequelize(
            app.nconf.get('database:database'),
            app.nconf.get('database:username'),
            app.nconf.get('database:password'),
            {   logging: true
                // dialect: 'mysql'
                //, define: {
                //    freezeTableName: true
                //}
            }
        );
    };

    var sequelize = getInstance();
    this.Test = sequelize.define('test', {
        id: Sequelize.INTEGER,
        key: Sequelize.STRING,
        value: Sequelize.STRING
//        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//        key: { type: Sequelize.STRING, allowNull: false },
//        value: { type: Sequelize.STRING, allowNull: true }
    }, {
        tableName: 'test'
    });

    this.all = function (callback) {
        //callback([{ id: 1, name: 'name#1' }, { id: 2, name: 'name#2' }, { id: 3, name: 'name#3'}]);

        this.Test.findAll({ where: ["id <= ?", 2] }).success(function (data) {
            callback(data);
        });

        //    getInstance()
        //    .query("select * from test")
        //    .success(function (o) {
        //        callback(o);
        //    })
        //    //.error(function (error) {
        //    //});
    }
    return this;
}