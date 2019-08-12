const express = require('express');
const app = express();
const mongoose = require('mongoose');

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
	description: String,
	opis: String,
	
});

const Post = mongoose.model("Post", PostSchema);

app.get('/', async (req, res) => {
	let post = await Post.create({title: 'Test', description: 'This is a desctripction'});
	res.send(post);
});


app.get('/home', async (req, res) => {
	let post = await Post.remove({title: 'Test', description: 'This is a desctripction'});
	res.send(post);
});










//HEROKU version
app.listen(process.env.PORT, process.env.IP);


// //GOORM version
// app.listen(3000, () => {
// 	console.log('server listenign on port 3000');
// });