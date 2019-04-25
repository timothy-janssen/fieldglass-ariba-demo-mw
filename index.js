var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var api     = require('./api.js');

var app = express();
app.use(bodyParser.json());

app.post('/catalog/search', function (req, res) {
	console.log("[POST] /catalog/search");

	const memory = req.body.conversation.memory;

 	api.call_api_catalog_search(memory.product)
 	.then(function(data){
    	console.log(data);
 		res.json({
    	  replies: data
    	});
 	})
});

app.post('/catalog/order', function (req, res) {
	console.log("[POST] /catalog/order");

	const memory = req.body.conversation.memory;

 	api.call_api_catalog_purchase(memory.product, memory.element.rank)
 	.then(function(data){
    	console.log(data);
 		res.json({
    	  replies: data
    	});
 	})
});

app.post('/worker_req/create', function (req, res) {
	console.log("[POST] /worker_req/create");
	
	const memory = req.body.conversation.memory;

	if(!memory.fg_token) {
		api.get_fg_token()
		.then(function(fg_token_data){
			memory.fg_token = fg_token_data;
 			api.call_api_worker_req_create(memory.fg_token)
 			.then(function(data){
 				res.json({
    			  replies: data
    			});
 			})			
		})
	} else {
 		api.call_api_worker_req_create(memory.fg_token)
 		.then(function(data){
 			res.json({
    		  replies: data
    		});
 		})	
	}

		
});

app.post('/worker_req/submit', function (req, res) {
	console.log("[POST] /worker_req/submit");
	
	const memory = req.body.conversation.memory;
 	api.call_api_worker_req_submit(memory.fg_token)
 	.then(function(data){    	
 		res.json({
    	  replies: data
    	});
 	})
		
});

// Recast will send a post request to /errors to notify errors
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 

});

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`)); 