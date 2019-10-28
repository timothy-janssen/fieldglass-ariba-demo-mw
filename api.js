var request = require('request-promise');
var dateFormat = require('dateformat');
var pw = require('./credentials.js');

exports.get_fg_token = function(memory){
	var post_options = {
	    uri:    "https://psg4.fgvms.com/api/oauth2/v2.0/token", // token call
	    method:  "POST",
	    headers: {
	    	"Content-Type": "application/x-www-form-urlencoded",
	    	"Authorization": pw.FG_AUTH,
	    	"X-ApplicationKey": pw.FG_APP_KEY_TOKEN
	    },
	    form: {
	    	"grant_type": "client_credentials",
	    	"response_type": "token"
	    }
	};

	return request.post(post_options)
	.then( function(token_data) {
		token_data = JSON.parse(token_data);
		console.log("token: " + token_data.access_token);
		return token_data;
	})	
}

exports.call_api_worker_req_create = function(token_data, memory){	
	post_options = {
		uri:    "https://psg4.fgvms.com/api/v1/saphire-demo/job-postings",
	   	method:  "POST",
	   	headers: {
	   		"Content-Type": "application/json",
	   		"Authorization": token_data.access_token || "",
	   		"X-ApplicationKey":pw.FG_APP_KEY  
	   	}
	}

	return request.post(post_options)
	.then( function(data_){
		console.log('[POST] Request completed /job-postings')
		data = JSON.parse(data_);
		title = data.jobTitle.replace(/[0-9]/g, '').replace(/[{()}]/g, '');
		code = data.jobCode.replace(/\D/g,'');;
		status = data.status;

		var date = new Date();
		date.setDate(date.getDate() + 1);
		start_date = dateFormat(date, "mmmm dS, yyyy");
		date.setDate(date.getDate() + memory.duration.days);
		end_date = dateFormat(date, "mmmm dS, yyyy");

		res_data = [{
			"type": 'text',
			"content": "Please confirm the following details:\n" +
					   "Job Title: " + title + "\n" +
					   "Job Code: " + code + "\n" +
					   "Start Date: " + start_date + "\n" +
					   "End Date: " + end_date + "\n\n" +
					   "Should I proceed?"					   
		},{
      		"type": "quickReplies",
      		"content": {
      			"title": "",
      		  	"buttons": [{
      		      	"value": "Yes",
      		      	"title": "Yes"
      		    },{
      		      	"value": "No",
      		      	"title": "No"
      		  	}]
      	}}];

      	return res_data;
	})
	.catch(function (err) {
		console.log(err);
		return [{
			"type": 'text',
			"content": "There was an error with the backend call." 				   
		}];
	});
};

exports.call_api_worker_req_submit = function(token_data){
		post_options = {
			uri:    "https://psg4.fgvms.com/api/v1/saphire-demo/job-postings", // token call
	    	method:  "POST",
	    	headers: {
	    		"Content-Type": "application/json",
	    		"Authorization": token_data.access_token || "",
	    		"X-ApplicationKey": "9tH7u7t8gXGgG8JqZYQ9qtxDKu8Z9vz5"
	    	}
		}

	return request.post(post_options)
	.then( function(data_) {
		data = JSON.parse(data_);
		title = data.jobTitle;
		code = data.jobCode;
		
		console.log('[POST] Request completed /job-postings 2')
		
		res_data = [{
			"type": 'text',
			"content": "The following contingent worker requisition has been submitted"
		},{
			"type": 'card',
			"content": {
		    	"title": title,
		    	"subtitle": code,
		    	"imageUrl": '',
	    		"buttons": []
		    }
		}];
		return res_data;
	})
	.catch(function (err) {
		console.log(err);
		return [{
			"type": 'text',
			"content": "There was an error with the backend call." 				   
		}];
	});
};

const ordinal_values = [
	"first",
	"second",
	"third",
	"fourth",
	"fifth",
	"sixth",
	"seventh",
	"eighth",
	"ninth",
	"tenth",
	"eleventh" ];


exports.call_api_catalog_search = function(memory){

	var query_obj 	= memory.product ? JSON.parse(memory.product) : JSON.parse(memory.organization);
	var query     	= query_obj      ? query_obj[0].raw.charAt(0).toUpperCase() + query_obj[0].raw.slice(1).replace(/s$/, '') : undefined;
	var opts 		= query 		 ? "?realm=mytestrealm&rsqlfilter=QueryTerms==" + query : "?realm=mytestrealm";

	console.log('Catalog search term: ' + query)

	var get_options = {
	    uri:    "https://openapi.ariba.com/api/catalog-search/v1/sandbox/search/items" + opts,
	    method:  "GET",
	    //json:    true,
	    headers: {
	    	"apiKey": pw.ARIBA_APP_KEY
	    }
	};

	return request.get(get_options)
	.then( function(req_data) {
		console.log('[POST] Request completed')
		res_data = {};
		catalog_elements = [];

		var count = 0;
		req_data.contents.forEach( function(elem){

			var list_item = {
    	        "title": elem.ShortName,
    	        "imageUrl": elem.Thumbnail,
    	        "subtitle": elem["Price.Amount"] + " " + elem["Price.Currency.UniqueName"],
    	        "buttons": [{
    	            "value": "Buy the " + ordinal_values[count] + " item",
    	            "title": "Order",
    	            "type": "postback"
    	        }],
    	        "details": {
    	        	"Supplier Name": elem.SupplierName,
    	        	"Supplier Part ID": elem.SupplierPartId,
    	        	"Manufacturer Name": elem.ManufacturerName,
    	        	"Lead Time": elem.LeadTime,
    	        	"Description": elem.Description,
    	        	"Price": elem["Price.Amount"],
    	        	"Currency": elem["Price.Currency.UniqueName"]
    	        }
    	    }

			catalog_elements.push(list_item);
			count++;
		});

		res_data.reply = [{
			"type": "text",
			"content": "Which one would you like to order?"
		},{
    	  "type": "list",
    	  "content": {
    	  	"title" : "Catalog List",
    	    "elements": catalog_elements 
    	  }
    	}];

    	res_data.catalog_elements = catalog_elements;

		return res_data;
	})
	.catch(function (err) {
		console.log(err);
		return [{
			"reply": {
				"type": 'text',
				"content": "There was an error with the backend call."
			}				   
		}];
	});
};

exports.call_api_catalog_purchase = function(memory){

	rank = memory.element.index;
	catalog = memory.catalog;
	item = catalog[rank];

	res_data.reply = [{
		"type": 'text',
		"content": "Are you sure you want to order this?"
	},{
		"type": 'card',
		"content": {
	    	"title": item.title,
	    	"subtitle": item.subtitle,
	    	"imageUrl": item.imageUrl,
	    	"buttons": []
	    }
	},{
    	"type": "quickReplies",
    	"content": {
    		"title": "",
    	  	"buttons": [{
    	      	"value": "Yes",
    	      	"title": "Yes"
    	    },{
    	     	"value": "No",
    	      	"title": "No"
    	  	}]
    }}];

    res_data.selected_product = item;
  
	return res_data;
};

exports.call_api_catalog_submit = function(memory){

	res_data = [{
		"type": 'text',
		"content": "Your order has been submitted."
	},{
		"type": 'card',
		"content": {
			"title": memory.selected_product.title,
			"subtitle": memory.selected_product.subtitle,
			"imageUrl": '',
			"buttons": []
		}
	}];
	return res_data;
}