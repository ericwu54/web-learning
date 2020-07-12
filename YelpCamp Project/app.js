var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose
	.connect('mongodb://localhost:27017/yelp_camp', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connected to DB!'))
	.catch((error) => console.log(error.message));

const campSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

const Campground = mongoose.model('Campground', campSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	Campground.find({})
		.then((DB_campgrounds) => {
			res.render('index', { campgrounds: DB_campgrounds });
		})
		.catch((error) => {
			console.log(error);
		});
});

app.post('/campgrounds', (req, res) => {
	// get data from form and add to campgounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = { name: name, image: image, description: description };
	Campground.create(newCampground)
		.then(() => {
			res.redirect('campgrounds');
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id)
		.then((campground) => {
			res.render('show', { campground: campground });
		})
		.catch((error) => {
			console.log(error);
		});
});

app.listen(3000, () => {
	console.log('YelpCamp Server Has Started!');
});
