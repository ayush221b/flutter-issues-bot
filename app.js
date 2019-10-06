const Twitter = require('twitter');
const config = require('./config.js');

const cron = require('node-cron');
const axios = require('axios');
const express = require('express');
const knex = require('knex');
const captureWebsite = require('capture-website');

var makeGithubRequest = require('./controllers/github_controller');
var selectIssues = require('./controllers/issue_select_controller');
var tweetIssues = require('./controllers/twitter_controller');

const app = express();

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

const client = new Twitter(config);

cron.schedule('*/5 * * * *', () => {
	console.log('started task');
	performOperation();
});

async function performOperation() {
	var issuesList = await makeGithubRequest(axios, db);
	console.log(`Total Issues being considered ${issuesList.length}`);

	if (issuesList.length > 0) {
		var selectedIssues = await selectIssues(issuesList, db);
		console.log(`Selected ${selectedIssues.length} issues.`);

		await tweetIssues(selectedIssues, client, captureWebsite, axios);
	}
}

app.get('/', (req, res) => {
	res.json('it is working!');
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Up and running on port ${process.env.PORT}`);
});
