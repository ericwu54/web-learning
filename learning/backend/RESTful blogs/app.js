var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');

const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/restful-blog-app', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('DB connected!'))
	.catch((error) => console.log(error.message));

const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(methodOverride('_delete'));
app.use(expressSanitizer());

// RESTful route
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
	Blog.find({})
		.then((blogs) => {
			res.render('index', { blogs: blogs });
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get('/blogs/new', (req, res) => {
	res.render('new');
});

app.post('/blogs', (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog)
		.then((newBlog) => {
			res.redirect('/blogs');
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get('/blogs/:id', (req, res) => {
	Blog.findById(req.params.id)
		.then((blog) => {
			res.render('show', { blog: blog });
		})
		.catch((error) => {
			res.redirect('/blogs');
		});
});

app.get('/blogs/:id/edit', (req, res) => {
	Blog.findById(req.params.id)
		.then((blog) => {
			res.render('edit', { blog: blog });
		})
		.catch((error) => {
			res.redirect('/blogs');
		});
});

app.put('/blogs/:id', (req, res) => {
	Blog.findByIdAndUpdate(req.params.id, req.body.blog)
		.then((updatedBlog) => {
			res.redirect('/blogs/' + req.params.id);
		})
		.catch((error) => {
			res.redirect('/blogs');
		});
});

app.delete('/blogs/:id', (req, res) => {
	Blog.findByIdAndDelete(req.params.id)
		.then((blog) => {
			res.redirect('/blogs');
		})
		.catch((error) => {
			res.redirect('/blogs');
		});
});

app.listen(3000, () => {
	console.log('server started!');
});
