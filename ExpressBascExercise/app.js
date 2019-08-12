var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

app.get('/speak/:animal', function (req, res){
	var sounds = {
		dog: 'Woof Woof',
		pig: 'Oink',
		cat: 'Mow',
		horse: 'pffrrr'
	};
	var animal = req.params.animal.toLowerCase();
	var sound = sounds[animal];

	res.send(animal + " says " +sound);
});


app.get('/repeat/:world/:num', function(req, res){
	var number = parseInt(req.params.num);
	var world = req.params.world;
	var message = '';
	console.log(number, world);
	
	for(var i =0; i< number; i++){
		message += world+' ';
	}
	res.send(message);
});


app.get('*', function(req, res){
	res.send("Sory page not found ... What are you doing with your life ?");
});

app.listen(port, ()=> console.log("port 3000 is working"));