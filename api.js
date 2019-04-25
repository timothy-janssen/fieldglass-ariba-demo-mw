var request = require('request-promise');

exports.get_fg_token = function(memory){
	var post_options = {
	    uri:    "https://psg4.fgvms.com/api/oauth2/v2.0/token ", // token call
	    method:  "POST",
	    headers: {
	    	"Content-Type": "application/x-www-form-urlencoded",
	    	"Authorization": "Basic SmFkYS5CYWtlcjpmaWVsZGdsYXNz",
	    	"X-ApplicationKey": "5c91f4fdb0c6ee9992ff476f89bf6cf25e589350"
	    },
	    form: {
	    	"grant_type": "client_credentials",
	    	"response_type": "token"
	    }
	};

	return request.post(post_options)
	.then( function(token_data) {
		console.log(token_data);
		return token_data;
	})	
}


exports.call_api_worker_req_create = function(token_data){	
/*	var post_options = {
	    uri:    "https://psg4.fgvms.com/api/oauth2/v2.0/token ", // token call
	    method:  "POST",
	    headers: {
	    	"Content-Type": "application/x-www-form-urlencoded",
	    	"Authorization": "Basic SmFkYS5CYWtlcjpmaWVsZGdsYXNz",
	    	"X-ApplicationKey": "5c91f4fdb0c6ee9992ff476f89bf6cf25e589350"
	    },
	    form: {
	    	"grant_type": "client_credentials",
	    	"response_type": "token"
	    }
	};

	return request.post(post_options)
	.then( function(token_data) {*/
		console.log("1: " + token_data);
		console.log("2: " + token_data.access_token);

		post_options = {
			uri:    "https://psg4.fgvms.com/api/v1/saphire-demo/job-postings",
	    	method:  "POST",
	    	headers: {
	    		"Content-Type": "application/json",
	    		"Authorization": token_data.access_token || "",
	    		"X-ApplicationKey": "9tH7u7t8gXGgG8JqZYQ9qtxDKu8Z9vz5"
	    	}
		}

		return request.post(post_options)
		.then(function(data){
			console.log('[POST] Request completed')

			res_data = {};

			title = data.jobTitle;
			code = data.jobCode;

			res_data.text = [{
				"type": "card",
				"title": "Create Job Posting"/*,
				"subtitle": "Not Submitted",
				"form": {
					title: code,
					"Posted by": "Jada Baker",
    	        	"Location": "Boston (1710-2017)",
    	        	"Start Date": "AUG/01/2018",
    	        	"End Date": "AUG/01/2019"
				}*/
			},{
      			"type": "quickReplies",
      			"content": {
      			  //"title": "Okay. Would you like to submit this requisition request",
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
      		return res_data;
		})
/*	})*/
	.catch(function (err) {
		console.log(err);
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


		console.log(token_data.access_token);


	return request.post(post_options)
	.then( function(data) {
		console.log('[POST] Request completed')
		res_data = {};
		res_data.submit_data = [{
    	  "type": "list",
    	  "content": {
    	  	"title" : "Your request has been submitted.",
    	    "elements": [{
    	        "title": "Marketing Coordinator (4410)",
    	        "imageUrl": "",
    	        "subtitle": "Job Code 50070970",
    	        "subtitle 2": "Pending Approval by Ada Rekab",
    	        "details": {
    	        	"Posted by": "Jada Baker",
    	        	"Location": "Boston (1710-2017)",
    	        	"Start Date": "AUG/01/2018",
    	        	"End Date": "AUG/01/2019"
    	        }
    	    }]
    	  },
    	  "delay": null
    	}];

		return res_data;
	})
	.catch(function (err) {
		console.log(err);
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


exports.call_api_catalog_search = function(query){
	var opts = "?realm=mytestrealm"
	opts = query ? opts + "&rsqlfilter=QueryTerms==" + query : opts;
	var get_options = {
	    uri:    "https://openapi.ariba.com/api/catalog-search/v1/sandbox/search/items" + opts,
	    method:  "GET",
	    json:    true,
	    headers: {
	    	"apiKey": "e874e8a3c6804e52af2de4c4b1fdb242"
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
    	        //"subtitle": elem.QueryTerms,
    	        "buttons": [{
    	            "value": "Buy the " + ordinal_values[count] + " item",
    	            "title": "Order",
    	            "type": "postback"
    	        }],
    	        /*"details": {
    	        	"Supplier Name": elem.SupplierName,
    	        	"Supplier Part ID": elem.SupplierPartId,
    	        	"Manufacturer Name": elem.ManufacturerName,
    	        	"Lead Time": elem.LeadTime,
    	        	"Description": elem.Description,
    	        	"Price": elem["Price.Amount"],
    	        	"Currency": elem["Price.Currency.UniqueName"]
    	        }*/
    	    }
			catalog_elements.push(list_item);
			count++;
		});

		//console.log(catalog_elements);

		res_data.catalog_list_data = [{
			"type": "text",
			"content": "Here's what I found in the catalog with query phrase " + query + ":"
		},{
    	  "type": "list",
    	  "content": {
    	  	"title" : "Catalog List",
    	    "elements": [ catalog_elements ] 
    	  },
    	  "delay": null
    	}];

		return res_data;
	})
	.catch(function (err) {
		console.log(err);
	});
};