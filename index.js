var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();	

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/', function(req, res) {
	var url = req.url.substr(1);

	delete req.headers["if-modified-since"]
	delete req.headers["if-none-match"];
	delete req.headers.host;

	console.log(req.headers);

	let options = {
		headers: req.headers,
		followAllRedirects: true,
		url: url
	};

	if (req.method == "POST") {
		options.method = "POST";
		options.body = JSON.stringify(req.body);
	} else if(req.method == "OPTIONS"){
		res.send("POST");
		return;
	}

	try {
		request(options, function (error, response, body) {
			Object.keys(response.headers).forEach((key) => {
				if(key.indexOf("access-control") === -1){
					res.set(key, response.headers[key]);
				}
			});

			res.send(body);
		});
	} catch (e) {
		res.send("Error");
	}
});

app.listen(process.env.PORT || 3000);

