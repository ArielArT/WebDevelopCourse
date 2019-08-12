var express = require('express');
var app = express();

// '/r/costam' => "Hi there!"
app.get("/r/:differentWord", function (req, res){
	console.log(req);
		res.send("Siemka!");
		});

// '/' => "Hi there!"
app.get("/", function (req, res){
		res.send("Hi there!");
		});
// "bye" => "Goodbye"
app.get("/bye", function (req, res){
		res.send("Goodbye");
		});
// "dog" => "MEow"clear
app.get("/dog", function (req, res){
		res.send("Działa");
		});
// "*" => "You are a star" It have to be LAST !!
app.get("*", function (req, res){
		res.send("You Are A Star :) ");
		});

// Tell Express to listen for request (start server)
app.listen(3000, () => console.log(`Example app listening on port 3000!`));