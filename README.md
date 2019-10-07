# Giving Issues the Attntion They Deserve!

[![Twitter](https://img.shields.io/badge/Follow_On_Twitter-Ayush_Shekhar-blue.svg?style=flat)](https://twitter.com/ayushshekhar17)
[![Follow_On_Medium](https://img.shields.io/badge/Follow_On_Medium-Ayush_Shekhar-green.svg)](https://medium.com/@ayushshekhar)
[![LinkedIn](https://img.shields.io/badge/Connect_On_LinkedIn-Ayush_Shekhar-blue.svg?style=flat)](https://www.linkedin.com/in/ayushshekhar/)

![Flutter Issues Logo](https://i.ibb.co/MD13FMx/issues-flutter-header.png)

# Star the repo to show your support. It will mean a lot.

## About the Project

I created this project as an open source initiative to help resolve the issues on the Flutter Repository faster. Being a Flutter Developer myself, I have always applauded the commitment of the Flutter team to help and resolve issues, but when you have 7,000+ open issues, it definitely helps to have as much community support as we can get.

## How does the bot work ?

1. It hits the [Github Search API](https://developer.github.com/v3/search/#search-issues-and-pull-requests) for issues, that are open.
The full URL which is used is:

`
https://api.github.com/search/issues?q='e'+is:issue+state:open+repo:flutter/flutter&sort=updated
`
For consecutive requests we alternate between sorting by `updated` and `created`.

2. In response, GitHub gives us a list of issues, which we go through to identify which issues to tweet about. 

3. Finally when we have our selected list, we use [capture-website](https://www.npmjs.com/package/capture-website) to get a screenshot of the issue url, and then send the image along with a tweet. This is done for all the selected issues.

## Running the Project Locally

```
git clone https://github.com/ayush221b/flutter-issues-bot.git
cd flutter-issues-bot
npm install
touch .env
```
Then inside the .env file, put in all your Twitter API credentials, as per the keys given in `config.js`

## Contributing

1. Fork the Project to your GitHub Account
2. Clone the forked repo
3. Create a branch
4. Make some changes
5. Push to your repo
6. Open Pull Request

Done.
