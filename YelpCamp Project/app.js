var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
seedDB();

const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/yelp_camp", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to DB!"))
	.catch((error) => console.log(error.message));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	Campground.find({})
		.then((DB_campgrounds) => {
			res.render("campgrounds/index", { campgrounds: DB_campgrounds });
		})
		.catch((error) => {
			console.log(error);
		});
});

app.post("/campgrounds", (req, res) => {
	// get data from form and add to campgounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = { name: name, image: image, description: description };
	Campground.create(newCampground)
		.then(() => {
			res.redirect("campgrounds");
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/new");
});

app.get("/campgrounds/:id/comments/new", (req, res) => {
	Campground.findById(req.params.id)
		.then((campground) => {
			res.render("comments/new", { campground });
		})
		.catch((error) => {
			console.log(error);
		});
});

app.post("/campgrounds/:id", (req, res) => {
	Campground.findById(req.params.id)
		.then((campground) => {
			Comment.create(req.body.comment)
				.then((comment) => {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.params.id)
		.populate("comments")
		.then((campground) => {
			res.render("campgrounds/show", { campground: campground });
		})
		.catch((error) => {
			console.log(error);
		});
});

app.listen(8080, () => {
	console.log("YelpCamp Server Has Started!");
});
