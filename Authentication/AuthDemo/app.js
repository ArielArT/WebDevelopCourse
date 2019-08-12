var express          = require("express");
var mongoose         = require("mongoose");
var passport         = require("passport");
var bodyParser       = require("body-parser");
var User             = require("./models/user");
var LocalStrategy    = require("passport-local");
var passportMongoose = require("passport-local-mongoose");

var app              = express();

app.use(require("express-session")({
	secret: "Ariel sie uczy",
	resave: false,
	saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//------------------------Mongoose Connect------------------------------------
mongoose.connect('mongodb+srv://Ariel:@T5nje8fqs@clusterariel-zb1ma.mongodb.net/Authentication?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB udalo sie !');
}).catch(err => {
	console.log('error: ', err.message);
}) ;



app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret",isLoggedIn , function(req, res){
	res.render("secret");
});

//----------------register--------------------
app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	
	User.register(new User({username: req.body.username}), req.body.password, function(err,user){
	if(err){
		console.log(err);
		return re.render('register');
	}else{
		passport.authenticate("local")(req, res, function(){
		res.redirect("/secret");
		});		  
		}
	});
});

//----------------login--------------------
app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) , function(req, res){

});

//----------------logout--------------------
app.get("/logout", function(req, res){
	req.logout();
	res.render("home");
});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.render("login");
}

//---------------serwer listen----------------
app.listen(3000, function(){
	console.log("Serwer start");
});