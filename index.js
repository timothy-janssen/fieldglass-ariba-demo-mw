var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var api = require('./api.js');

var app = express();
app.use(bodyParser.json());

app.post('/catalog/search', function (req, res) {
	console.log("[POST] /catalog/search");

	var memory = req.body.conversation.memory;

 	api.call_api_catalog_search(memory)
 	.then(function(data){
 		memory.catalog = data.catalog_elements;
    	console.log("SEARCH:");
    	console.log(data.reply);
 		res.json({
    	  	replies: data.reply,
    	  	conversation: {
    	  		memory: memory
          	}
    	});
 	})
	.catch(function (err) {
		console.log(err);
	});	
});

app.post('/catalog/order', function (req, res) { 
	console.log("[POST] /catalog/order");

	var memory = req.body.conversation.memory;

 	data = api.call_api_catalog_purchase(memory);
 	memory.selected_product = data.selected_product;
 	console.log("ORDER:");
 	console.log(data.reply);
 	res.json({
    	replies: data.reply,
      	conversation: {
   	  		memory: memory
       	}    	  
   	});
});

app.post('/catalog/submit', function (req, res) {
	console.log("[POST] /catalog/order");

	var memory = req.body.conversation.memory;

 	data = api.call_api_catalog_submit(memory);
 	console.log("SUBMIT:");
 	console.log(data);
 	res.json({
    	replies: data
    });
});

app.post('/worker_req/create', function (req, res) {
	console.log("[POST] /worker_req/create");

	var memory = req.body.conversation.memory;

	if(!memory.fg_token) {
		api.get_fg_token()
		.then(function(fg_token_data){
			memory.fg_token = fg_token_data;
 			api.call_api_worker_req_create(memory.fg_token, memory)
 			.then(function(data){
 				res.json({
    				replies: data,
      				conversation: {
   	  					memory: memory
       				}  
    			});
 			})	
			.catch(function (err) {
				console.log(err);
			});			
		})
	} else {
 		api.call_api_worker_req_create(memory.fg_token, memory)
 		.then(function(data){
 			res.json({
    		  	replies: data
    		});
 		})
		.catch(function (err) {
			console.log(err);
		});	
	}
});

app.post('/worker_req/submit', function (req, res) {
	console.log("[POST] /worker_req/submit");

	var memory = req.body.conversation.memory;

	if(!memory.fg_token) {
		api.get_fg_token()
		.then(function(fg_token_data){
			memory.fg_token = fg_token_data;
 			api.call_api_worker_req_submit(memory.fg_token)
 			.then(function(data){
 				res.json({
    				replies: data,
      				conversation: {
   	  					memory: memory
       				}  
    			});
 			})
			.catch(function (err) {
				console.log(err);
			});				
		})
	} else {
 		api.call_api_worker_req_submit(memory.fg_token)
 		.then(function(data){
 			res.json({
    		  replies: data
    		});	
 		})
		.catch(function (err) {
			console.log(err);
		});		
	}


});


app.post('/test/flip', function (req, res) {
	var memory = req.body.conversation.memory;
	memory.flip = Math.random() < 0.5 ;

	res.json({
    	conversation: {
    		replies: {
				"type": 'text',
				"content": "FLIP: " + memory.flip
			},
   			memory: memory
    	}  
    });
});

// Recast will send a post request to /errors to notify errors
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 

});

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`)); 