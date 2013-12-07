module.exports = function (app) {
    // home page
    app.get('/', function (req, res) {
        res.render('index', { title: 'Home Page.  ' })
    });
    /* home page
    app.get('/', function (req, res) {
    	// require('./routes/home')(app);
		res.setHeader('Content-Type', 'text/html');
		res.send('hello?<hr>' + fs.readFileSync('./index.html'));
    });*/
}
