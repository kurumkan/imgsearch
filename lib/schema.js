var mongoose = require("mongoose");  
//mongoose.connect("mongodb://localhost/imgsearch");
mongoose.connect("mongodb://kurumkan:fhnehbr1@ds141937.mlab.com:41937/imgsearch");

//schema config
var SearchSchema = new mongoose.Schema({
	term: String,	
	when: {
		type: Date, default: Date.now
	}	
});

module.exports = mongoose.model("ImgSearch", SearchSchema);



