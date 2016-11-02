var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/imgsearch");

//schema config
var SearchSchema = new mongoose.Schema({
	term: String,	
	when: {
		type: Date, default: Date.now
	}	
});

module.exports = mongoose.model("ImgSearch", SearchSchema);



