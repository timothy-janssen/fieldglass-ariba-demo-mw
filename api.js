var request = require('request-promise');

exports.call_api_worker_req_create = function(){	
	var post_options = {
	    uri:    "https://jsonplaceholder.typicode.com/posts", // dummy call
	    method:  "POST",
	    json:    true,
	    body: {}
	};

	return request.post(post_options)
	.then( function(data) {
		console.log('[POST] Request completed')
		data = {};
		data.submit_qr = [{
      		"type": "quickReplies",
      		"content": {
      		  "title": "Okay. Would you like to submit this requisition request",
      		  "buttons": [
      		    {
      		      "value": "Submit",
      		      "title": "Submit"
      		    },
      		    {
      		      "value": "Cancel",
      		      "title": "Cancel"
      		    },
      		    {
      		      "value": "Make Changes",
      		      "title": "Make Changes"
      		    }
      		  ]
      	}}];
      	return data;
	})
	.catch(function (err) {
		//console.log(err);
	});
};

exports.call_api_worker_req_submit = function(){	
	var post_options = {
	    uri:    "https://jsonplaceholder.typicode.com/posts", // dummy call
	    method:  "POST",
	    json:    true,
	    body: {}
	};

	return request.post(post_options)
	.then( function(data) {
		console.log('[POST] Request completed')
		data = {};
		data.catalog_list_data = [{
    	  "type": "list",
    	  "content": {
    	  	"title" : "Your request has been submitted.",
    	    "elements": [{
    	        "title": "Marketing Coordinator (4410)",
    	        "imageUrl": "",
    	        "subtitle": "Job Code 50070970",s
    	        "subtitle 2": "Pending Approval by Ada Rekab",
    	        "details": {
    	        	"Posted by:": "Jada Baker",
    	        	"Location": "Boston (1710-2017)",
    	        	"Start Date": "AUG/01/2018",
    	        	"End Date": "AUG/01/2019"
    	        }
    	    }]
    	  },
    	  "delay": 2
    	}];

		return data;
	})
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
	.then( function(data) {
		console.log('[POST] Request completed')
		data = {};
		data.catalog_list_data = [{
			"type": "text",
			"content": "Here's what I found for catalogs with query phrase MacBook:"
		},{
    	  "type": "list",
    	  "content": {
    	  	"title" : "Catalog List",
    	    "elements": [{
    	        "title": "Apple MacBook Pro 15\"",
    	        "imageUrl": "",
    	        "subtitle": "2399 USD",
    	        "buttons": [{
    	            "value": "Buy the first item",
    	            "title": "Order",
    	            "type": "postback"
    	        }],
    	        "details": {
    	        	"Supplier Name": "REDINGTON DISTRIBUTION PTE LTD",
    	        	"Supplier Part ID": "AD2561",
    	        	"Manufacturer Name": "Apple",
    	        	"Lead Time": "3",
    	        	"Description": "Apple MacBook Pro with 15 inch Retina display - Laptop - 3.2 GHz flash storage 2880 x 1880 - 802.11ac",
    	        	"Price": "2399",
    	        	"Currency": "USD"
    	        }
    	      },{
    	        "title": "Apple MacBook Pro 13\"",
    	        "imageUrl": "",
    	        "subtitle": "1299 USD",
    	        "buttons": [{
    	            "value": "Buy the second item",
    	            "title": "Order",
    	            "type": "postback"
    	        }],
    	        "details": {
    	        	"Supplier Name": "REDINGTON DISTRIBUTION PTE LTD",
    	        	"Supplier Part ID": "AD2841",
    	        	"Manufacturer Name": "Apple",
    	        	"Lead Time": "4",
    	        	"Description": "Apple MacBook Pro with 13 inch Retina display - Laptop - 3.2 GHz flash storage 2480 x 1680 - 802.11ac",
    	        	"Price": "1299",
    	        	"Currency": "USD"
    	        }
    	      },{
    	        "title": "Apple MacBook Air",
    	        "imageUrl": "",
    	        "subtitle": "1399 USD",
    	        "buttons": [{
    	            "value": "Buy the third item",
    	            "title": "Order",
    	            "type": "postback"
    	        }],
    	        "details": {
    	        	"Supplier Name": "REDINGTON DISTRIBUTION PTE LTD",
    	        	"Supplier Part ID": "AD7399",
    	        	"Manufacturer Name": "Apple",
    	        	"Lead Time": "5",
    	        	"Description": "Apple MacBook Air with 13 inch display - Laptop - 3 GHz flash storage 2480 x 1680 - 802.11ac",
    	        	"Price": "1399",
    	        	"Currency": "USD"
    	        }
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