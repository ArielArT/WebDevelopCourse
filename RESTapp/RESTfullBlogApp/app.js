var express        = require('express'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer'),
	bodyParser     = require('body-parser'),
	mongoose       = require('mongoose');
var app  = express();

//----------------------MongoDB connect--------------------------------
mongoose.connect('mongodb+srv://Ariel:@T5nje8fqs@clusterariel-zb1ma.mongodb.net/RESTapp?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB udalo sie !');
}).catch(err => {
	console.log('error: ', err.message);
}) ;

//--------------------Settings---------------------------------------------
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));


//--------------------------mongoDB Schema---------------------------------
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Ariel",
// 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQetHSKm0dCEdssYWjZKEH0s5w0XtzVHsyLs5yvMcvrARNkHe5n",
// 	body: "Hello this is a blog post"
// },function (err, campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(campground);
// 	}
// });

//------------------------Restful routes-----spokojne trasy-----------------
app.get("/", function (req, res){
	res.redirect("/blogs");
});
// INDEX ROUTE	
app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERRRORROROROROOR");
			console.log(err);}
		else{
			res.render("index.ejs", {blogs: blogs});
		}
	});

});
// NEW ROUTE
app.get('/blogs/new', function(req, res){
	res.render('new.ejs');
});
//CREATE ROUTE
app.post("/blogs", function(req, res){
	// create 
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		}else{
			// then redirect to the index
			res.redirect("/blogs");
		}
	});
});

// SHOW ROUTE
app.get('/blogs/:id', function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show", {blog: foundBlog});
		}
	});
});

// EDIT ROUTR
app.get('/blogs/:id/edit', function(req, res){
		Blog.findById(req.params.id, function (err, foundBlog){
			if(err){
				res.redirect("/blogs");
			}else{
				res.render("edit", {blog: foundBlog});
			}
		});
		
		});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findOneAndUpdate({ _id: req.params.id}, req.body.blog, function (err, updateBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	});
});
//------------------------------Server listen-----------------------------
app.listen(3000, function(){
	console.log("Serwer starts");
});

