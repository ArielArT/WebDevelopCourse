const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");

mongoose.connect('mongodb+srv://Ariel:@T5nje8fqs@clusterariel-zb1ma.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB udalo sie !');
}).catch(err => {
	console.log('error: ', err.message);
}) ;


const PostSchema = new mongoose.Schema({
	title: String,
	artist: String,
	
});

const Post = mongoose.model("Post", PostSchema);
//----------------------------------------------------------------------------------------

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
	res.render('home.ejs');
});


app.get('/change', function(req, res){
	res.render('change.ejs');
});


app.post('/add', function(req, res){
	var title = req.body.title;
	var artist = req.body.artist;
	var newObject = {title: title, artist: artist};
	
	let post = Post.create(newObject);
	res.redirect("/change");
});

app.post('/remove', async (req, res) => {
	
// 	var title = req.body.title;
// 	var artist = req.body.artist;
// 	var newObject = {title: title, artist: artist};
	let post = await Post.remove({title: req.body.title, artist: req.body.artist});
	res.redirect("/change");
});

var Dupek78 = new Post({
	title: "Dupek77",
	artist: "Dupek77"
});

Dupek78.save();

Post.find({}, function(err, posts){
	if(err){
		console.log("OH error");
		console.log(err);
	}else{
		console.log("ALL POSTS");
		console.log(posts);
	}
});





app.get('/results', function(req, res){
	res.render('results.ejs');
});

//-----------------------------------------------------------------------------------------

app.listen(3000, function(){
	console.log('YelpCamp Server has started');
});