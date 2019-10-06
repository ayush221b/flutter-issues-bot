// Controller function to tweet about the issues.

module.exports = async function tweetIssues(selectedIssuesList, client, captureWebsite, axios) {
	for (var i = 0; i < selectedIssuesList.length; i++) {
		var issue = selectedIssuesList[i];

		await captureWebsite.file(issue.html_url, 'screenshot.png', {
			overwrite: true,
			scrollToElement: '.gh-header-show',
			launchOptions: {
				args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
			}
		});

		console.log(`got image for ${issue.title}`);

		// Load your image
		var data = require('fs').readFileSync('./screenshot.png');

		// Make post request on media endpoint. Pass file data as media parameter
		client.post('media/upload', { media: data }, function(error, media, response) {
			if (!error) {
				// If successful, a media object will be returned.
				console.log(media);

				// Lets tweet it with the relevant text
				var status = {
					status: `#Flutter issue: ${issue.title.length > 40
						? issue.title.substring(0, 40) + '...'
						: issue.title} ${issue.html_url}`,
					media_ids: media.media_id_string // Pass the media id string
				};

				client.post('statuses/update', status, function(error, tweet, response) {
					if (!error) {
						console.log(tweet);
					} else console.log(error);
				});
			} else console.log(error);
		});
	}
};
