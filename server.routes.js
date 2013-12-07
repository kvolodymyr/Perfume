var fs      = require('fs');

module.exports = function (app) {
	require('./routes/home')(app);
};