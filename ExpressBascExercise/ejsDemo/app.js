var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render('home');
});

app.get("/name/:name", function (req, res){
	var name = req.params.name;
	res.render('secon', {name: name});
});

app.get('/posts', function (req, res){
	var posts = [
	{title: "Post 1", author: "Ariel"},
	{title: "Difrenet Post", author: "Andrej "},
	{title: "Horse on rail", author: "Kon"},
	{title: "Post 1333333", author: "Lalka"},
	{title: "Sweet home sweet home", author: "Deep Ddepp"}
	];
		res.render('posts', {posts: posts});
		
});

app.listen(3000, ()=>{
	console.log('serwer ok');
});