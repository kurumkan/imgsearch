var express= require("express");
var app = express();
var utils = require("./lib/utils.js");

var DB = require("./lib/schema.js");
app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

//our db schema
var ImgSearch = DB.ImgSearch;

app.get("/", function(request, response){		
	response.render("index");	
});

//404 error handler
app.use(function(request, response){	
	response.status(404);
	response.render("404");
});

//500 error handler
app.use(function(error, request, response, next){
	utils.handle500(error, response);
});

//if Process env port is not defined - set 5000 as a port
app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
});