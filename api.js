var request = require('request-promise');

exports.call_api_worker_req_create = function(){	

	return request.post()
	.then(console.log('[POST] Request completed'))
	.catch(function (err) {
		//console.log(err);
	});
};


exports.call_api_catalog_search = function(){	

	return request.post()
	.then(console.log('[POST] Request completed'))
	.catch(function (err) {
		//console.log(err);
	});
};