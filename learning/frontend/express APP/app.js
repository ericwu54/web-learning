var express = require('express');
var app = express();

// route
app.get('/', function(req, res) {
	res.send('hi there!');
});

app.get('/bye', function(req, res) {
	res.send('Goodbye!!');
});

app.get('/dog', function(req, res) {
	res.send('MEOW!');
});

app.get('*', function(req, res) {
	res.send('wrong address');
});

// listen for requests
app.listen(3000, function() {
	console.log('server started');
});
