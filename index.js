var express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

var app = express();
app.use(bodyParser.json());

app.post('/catalog/search', function (req, res) {
	console.log("[POST] Successful post request")
});

app.post('/worker_req/create', function (req, res) {
	console.log("[POST] Successful post request")
});

// Recast will send a post request to /errors to notify errors
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 

});

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`)); 