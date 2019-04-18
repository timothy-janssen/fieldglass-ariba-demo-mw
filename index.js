var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var api     = require('./api.js');

var app = express();
app.use(bodyParser.json());

app.post('/catalog/search', function (req, res) {
	console.log("[POST] /catalog/search");

	const memory = req.body.conversation.memory;

 	api.call_api_catalog_search()
 	.then(function(data){
 		list = data.catalog_list_data;
    	
 		res.json({
    	  replies: list
    	});
 	})
});

app.post('/worker_req/create', function (req, res) {
	console.log("[POST] /worker_req/create");
	
	const memory = req.body.conversation.memory;
 	api.call_api_worker_req_create()
 	.then(function(data){
 		qr = data.submit_qr;
    	
 		res.json({
    	  replies: qr
    	});
 	})
		
});

app.post('/worker_req/submit', function (req, res) {
	console.log("[POST] /worker_req/submit");
	
	const memory = req.body.conversation.memory;
 	api.call_api_worker_req_submit()
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