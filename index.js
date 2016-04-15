var express = require('express');
var request = require('request');

var app = express();	

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/', function(req, res) {
	var url = req.url.substr(1);

	try {
		var stream = request(url);

		stream
			.on('error', function(err) {
				res.send("Error");
			})
			.pipe(res);
	} catch (e) {
		res.send("Error");
	}
});

app.listen(process.env.PORT || 3000);

