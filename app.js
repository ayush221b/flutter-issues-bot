var Twitter = require('twitter');
var config = require('./config.js');

var cron = require('node-cron');
var axios = require('axios');
var express = require('express');
var knex = require('knex');

var makeGithubRequest = require('./controllers/github_controller');
var selectIssues = require('./controllers/issue_select_controller');

const app = express();

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

var client = new Twitter(config);

cron.schedule('* * * * *', () => {
	console.log('started task');
	performOperation();
});

async function performOperation() {
	var issuesList = await makeGithubRequest(axios, db);
	console.log(`Total Issues being considered ${issuesList.length}`);

	if (issuesList.length > 0) {
		var selectedIssues = await selectIssues(issuesList, db);
		console.log(`Selected ${selectedIssues.length} issues.`);
	}
}

app.get('/', (req, res) => {
	res.json('it is working!');
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Up and running on port ${process.env.PORT}`);
});
