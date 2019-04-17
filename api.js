var request = require('request-promise');

exports.call_api_worker_req_create = function(){	

	return request.post()
	.then(console.log('[POST] Request completed'))
	.catch(function (err) {
		//console.log(err);
	});
};


exports.call_api_catalog_search = function(){	
	var post_options = {
	    uri:    "https://jsonplaceholder.typicode.com/posts", // dummy call
	    method:  "POST",
	    json:    true,
	    body: {}
	};

	return request.post(post_options)
	.then( function(datd) {
		console.log('[POST] Request completed')
		data = {};
		data.catalog_list_data = [{
    	  "type": "list",
    	  "content": {
    	  	"title" : "Which laptop would you like to request?"
    	    "elements": [{
    	        "title": "Lenovo T560",
    	        "imageUrl": "",
    	        "subtitle": "i5 / 16 GB / 512 GB / Black",
    	        "buttons": [{
    	            "value": "Buy the first item",
    	            "title": "$2,096.10",
    	            "type": "postback"
    	        }]
    	      },{
    	        "title": "Apple MacBook Pro 13\"",
    	        "imageUrl": "",
    	        "subtitle": "i5 / 16 GB / 512 GB / Gray",
    	        "buttons": [{
    	            "value": "Buy the second item",
    	            "title": "$35,000",
    	            "type": "postback"
    	        }]
    	      },{
    	        "title": "Apple MacBook Pro 15\"",
    	        "imageUrl": "",
    	        "subtitle": "i7 / 16 GB / 512 GB / Gray",
    	        "buttons": [{
    	            "value": "Buy the third item",
    	            "title": "$36,000",
    	            "type": "postback"
    	        }]
    	    }]
    	  },
    	  "delay": null
    	}];

		return data;
	})
	.catch(function (err) {
		//console.log(err);
	});
};