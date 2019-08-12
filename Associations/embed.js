var mongoose = require("mongoose");


//----------------------MongoDB connect--------------------------------
mongoose.connect('mongodb+srv://Ariel:@T5nje8fqs@clusterariel-zb1ma.mongodb.net/Associations?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB udalo sie !');
}).catch(err => {
	console.log('error: ', err.message);
}) ;

//--------------------------Mongoose Schema--------------------------------------------
//POST - tittle, content

var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



//-----------------------------------New User -------------------------------
// var newUser = new User({
// 	email: "hermiona@hogwart.edu",
// 	name: "Hermiona"
// });

// newUser.posts.push({
// 	title: "bla bla bla bla bla",
// 	content: " ola boga sily doda co sie dzieje"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log("ERRRRRRRRR");
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

//New Post
// var newPost = new Post({
// 	title: "Ciekawe Jabłka",
// 	content: "Ciekawe nie zawsze znaczy zmaczne"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// });

User.findOne({name: "Hermiona"}, function(err, user){
	if(err){
		console.log(err);
	}else{
		user.posts.push({
			title: "Siema",
			content: "Co tam slychac u wielkiej Hermiony"
		});
		user.save(function(){});
	}
});