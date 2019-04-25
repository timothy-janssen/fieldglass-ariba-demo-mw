var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var api     = require('./api.js');

var app = express();
app.use(bodyParser.json());

app.post('/catalog/search', function (req, res) {
	console.log("[POST] /catalog/search");

	const memory = req.body.conversation.memory;

 	api.call_api_catalog_search("Laptop")
 	.then(function(data){
    	console.log(data);
 		res.json({
    	  replies: data.catalog_list_data
    	});
 	})
});

app.post('/worker_req/create', function (req, res) {
	console.log("[POST] /worker_req/create");
	
	const memory = req.body.conversation.memory;

	if(!memory.fg_token) {
		api.get_fg_token()
		.then(function(data){
			memory.fg_token = data;
 			api.call_api_worker_req_create(memory.fg_token)
 			.then(function(data){
 				qr = data.submit_qr;
    			
 				res.json({
    			  replies: qr
    			});
 			})			
		})
	} else {
 		api.call_api_worker_req_create(memory.fg_token)
 		.then(function(data){
 			qr = data.submit_qr;
    		
 			res.json({
    		  replies: qr
    		});
 		})	
	}

		
});

app.post('/worker_req/submit', function (req, res) {
	console.log("[POST] /worker_req/submit");
	
	const memory = req.body.conversation.memory;
 	api.call_api_worker_req_submit(memory.fg_token)
 	.then(function(data){
 		list_card = data.submit_data;
    	
 		res.json({
    	  replies: list_card
    	});
 	})
		
});

// Recast will send a post request to /errors to notify errors
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 

});

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`)); 