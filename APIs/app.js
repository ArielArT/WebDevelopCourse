var express= require("express");
var app = express();
var request = require("request");

app.get('/', function (req, res){
	res.render('search.ejs');
});


app.get('/movies', function(req, res){
	var query = req.query.search;
	var url = 'http://www.omdbapi.com/?s='+query+'&apikey=thewdb';
	request(url, function (error, response, body) {
	var data = JSON.parse(body);
	res.render('results.ejs', {data: data});
});
});


app.listen(3000, function  (){
	console.log('movie APP starts');
});