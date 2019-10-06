// Controller function to fetch issues from GitHub

module.exports = async function makeGithubRequest(axios, db) {
	var issuesList;
	var totalResultCount;

	// Get current page number from db
	var pageNumber;

	try {
		var data = await db('page').where('id', 1);
		console.log(` currently on page number : ${data[0].pagenumber}`);
		pageNumber = data[0].pagenumber;

		const url = `https://api.github.com/search/issues?q='e'+is:issue+state:open+repo:flutter/flutter&sort=updated&page=${pageNumber}&per_page=20`;

		// fetch issues
		let response = await axios.get(url);

		totalResultCount = response.data.total_count;

		console.log(`total issues count is: ${totalResultCount}`);

		var allowedPages = Math.floor(totalResultCount / 20);
		if (pageNumber < allowedPages - 1) {
			pageNumber += 1;

			await db('page').where('id', 1).update({
				pagenumber: pageNumber
			});
		} else {
			await db('page').where('id', 1).update({
				pagenumber: 1
			});
		}

		issuesList = response.data.items;

		return issuesList;
	} catch (error) {
		console.log(error);
		return [];
	}
};
