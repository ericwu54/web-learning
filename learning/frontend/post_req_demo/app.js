var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var friends = [ 'a', 'b', 'c', 'd', 'e' ];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/friends', function(req, res) {
	res.render('friends', {
		friends: friends
	});
});

app.post('/addfriend', function(req, res) {
	var newfriend = req.body.name;
	friends.push(newfriend);
	res.redirect('/friends');
});

app.listen(3000, function() {
	console.log('server started');
});
