// Controller function to select issues which need to be tweeted about.

module.exports = async function selectIssues(issuesList, db) {
	var selectedIssues = [];

	for (var i = 0; i < issuesList.length; i++) {
		var issue = issuesList[i];

		var toSelect = 0;
		if (issue.assignees.length == 0) {
			if (issue.comments > 2) {
				toSelect = 1;
			}
			if (issue.labels.length > 0) {
				toSelect = 1;
			}
		}

		if (toSelect === 1) {
			var ids = await db('issues').where('issueid', '=', issue.id);

			if (ids.length === 0) {
				selectedIssues.push(issue);

				await db('issues').insert({ issueid: issue.id });
			}
		}
	}

	return selectedIssues;
};
