var http = require('http');

var server = http.createServer(function (req, res) {
	console.log('This will print in the server console');
	console.log(req.url);
	res.end('This will print on the webpage localhost:3000');
});

server.listen(3000);