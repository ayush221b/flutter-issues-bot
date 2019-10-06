var Twitter = require('twitter');
var config = require('./config.js');

var cron = require('node-cron');
var axios = require('axios');
var express = require('express');

const app = express();

var client = new Twitter(config);



app.get('/', (req, res) => {
	res.json('it is working!');
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Up and running on port ${process.env.PORT}`);
});
