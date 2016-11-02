module.exports = {	
	//handle internal errors
	handle500: function(error,response){
		console.log(error.stack);
		response.status(500);
		response.json({error: "500 internal error"});
	}
}