module.exports = function (sequelize, DataTypes) {
    var Sequelize = require('sequelize');
    return sequelize.define('test', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        key: { type: Sequelize.STRING, allowNull: false },
        value: Sequelize.STRING
    }, {
        tableName: 'test'
    });
}