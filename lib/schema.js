var mongoose = require("mongoose");
var utils = require("./utils.js");

mongoose.connect("mongodb://localhost/imgsearch");

//schema config
var ImgSearch = new mongoose.Schema({
	term: String,	
	when: {
		type: Date, default: Date.now
	}	
});
module.exports = {
	//db model
	ImgSearch: mongoose.model("ImgSearch", ImgSearch)
}


