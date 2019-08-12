var mongoose = require("mongoose");
var Post = require("./models/post");
var User = require("./models/user");

//----------------------MongoDB connect--------------------------------
mongoose.connect('mongodb+srv://Ariel:@T5nje8fqs@clusterariel-zb1ma.mongodb.net/AssociationsSecond?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB udalo sie !');
}).catch(err => {
	console.log('error: ', err.message);
}) ;

//--------------------------Mongoose Schema--------------------------------------------



// User.create({
// 	email: "kon@kon.pl",
// 	name: "kon"
// });

// Post.create({
// 	title: "siemka",
// 	content: "no pewnie ze cos cos tam cos tam"
// });

// Post.findOne({title: "Bla bla"}, function (err, post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		User.findOne({email: "kon@kon.pl"}, function(err, foundUser){
// 			if(err){
// 				console.log(err);
// 			}else{
// 				foundUser.posts.push(post);
// 				foundUser.save();
// 			}
// 		});
// 	}
// });

User.findOne({name: "kon"}).populate("posts").exec(function (err, user){
	if(err){
		console.log(err);
	}else{
		console.log(user);
	}
});