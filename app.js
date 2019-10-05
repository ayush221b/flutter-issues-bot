var Twitter = require('twitter');
var config = require('./config.js');

var client = new Twitter(config);

client
	.post('statuses/update', { status: 'Hello World, I Love Twitter!' })
	.then(function(tweet) {
		console.log(tweet);
	})
	.catch(function(error) {
		throw error;
	});