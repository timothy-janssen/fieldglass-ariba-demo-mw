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
 	.then(function(){
 		list = {
    	  "type": "list",
    	  "content": {
    	    "elements": [{
    	        "title": "Lenovo T560",
    	        "imageUrl": "",
    	        "subtitle": "i5 / 16 GB / 512 GB / Black",
    	        "buttons": [{
    	            "value": "Buy the Lenovo T560",
    	            "title": "$2,096.10",
    	            "type": "postback"
    	        }]
    	      },{
    	        "title": "Apple MacBook Pro 13\"",
    	        "imageUrl": "",
    	        "subtitle": "i5 / 16 GB / 512 GB / Gray",
    	        "buttons": [{
    	            "value": "Buy the Apple MacBook Pro 13\"",
    	            "title": "$35,000",
    	            "type": "postback"
    	        }]
    	      },{
    	        "title": "Apple MacBook Pro 15\"",
    	        "imageUrl": "",
    	        "subtitle": "i7 / 16 GB / 512 GB / Gray",
    	        "buttons": [{
    	            "value": "Buy the Apple MacBook Pro 15\"",
    	            "title": "$36,000",
    	            "type": "postback"
    	        }]
    	    }]
    	  },
    	  "delay": null
    	};
    	
 		res.json({
    	  replies: list
    	});
 	})
});

app.post('/worker_req/create', function (req, res) {
	console.log("[POST] /worker_req/create");
	
	const memory = req.body.conversation.memory;
 	api.call_api_worker_req_create()
 	.then(function(){

 	})
		
});

// Recast will send a post request to /errors to notify errors
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 

});

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`)); 