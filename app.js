var express= require("express");
var app = express();
var utils = require("./lib/utils.js");

// Bing Search client
var bingSearch = new (require('bing.search'))("plEq0NctaKIEfjl0ltpPloLhUQqY6y8dzuPEpqesvL0");

//DB Schema
var SearchShema = require("./lib/schema.js");

app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", function(request, response){		
	response.render("index", {host: "http://"+request.headers.host});	
});

//search query route
app.get("/api/imagesearch/:term", function(request, response){		
	var term = request.params.term;
	
	//if term was provided - create a db entry
	if(term){		
		SearchShema.create({term: term}, function(error, data){
			if(error) utils.handle500(error, response);			
		});		    
	}
	
	var offset = +request.query.offset;	

	if(!offset)
		offset=0;		
	
	bingSearch.images(term, 
		{top: 20, skip: offset},
		function(error, results) {
			if(error) utils.handle500(error, response);	  	
			else
				response.json(results.map(function(entry){
					return {
						url: entry.url,
						snippet: entry.title,
						thumbnail: entry.thumbnail.url,
						context: entry.sourceUrl
					};
				})); 
		}
	);
});

//recently submitted search strings
app.get("/api/latest/imagesearch", function(request, response){		

	SearchShema.find({})
	.sort({'created': -1})
	.limit(10)
	.exec(function(error, results) {
		if(error){
			utils.handle500(error, response);			
		}else{
			response.json(results.map(function(entry){
	  			return {
	  				term: entry.term,
	  				when: entry.when
	  			}
	  		})); 
		}
	});
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