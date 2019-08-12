var mongoose = require("mongoose");

//POST - tittle, content

var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

module.exports = mongoose.model("Post", postSchema);
