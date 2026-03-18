# Deploy GithubReadmeGenerator on Railway

A Tool that generates a customized SVG for in your Github profile readme

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/FA69vd)

## About

Deploy this app on Railway, fill in the .env variables with your GitHub info, and use the generated URL in your GitHub repository. Create a README.md file in a repo matching your GitHub username, and add:

![Header](https://your-railway-url.app/api/github-readme)

Customize further using environment variables. Feel free to contribute on Github!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Github-readme-generator | [IIRoan/iiroan-description-generator](https://github.com/IIRoan/iiroan-description-generator) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BIO` | Your custom bio goes here | Your custom bio text to display in the SVG if 'USE_GITHUB_BIO' is set to 'false'. |
| `PORT` | 3000 | The port number the application will listen on. Railway sets this automatically, so it can be left unset. |
| `EMAIL_LINK` | - | A 'mailto:' link for your email address, allowing users to contact you directly. |
| `GITHUB_LINK` | - | URL to your GitHub profile. Defaults to your username's profile URL if left empty. |
| `GITHUB_TOKEN` | (secret) | Your GitHub Personal Access Token to authenticate API requests. For public data, no special permissions are needed. |
| `WEBSITE_LINK` | - | URL to your personal or professional website. |
| `USE_GITHUB_BIO` | true | Set to 'true' to use your GitHub bio in the SVG, or 'false' to use a custom bio provided in the 'BIO' variable. |
| `GITHUB_USERNAME` | (secret) | Your GitHub username to fetch profile, repositories, and activity data. |
| `NAME_FILL_COLOR` | #fabd2f | HEX color code for the name text in the SVG image. |
| `REPO_DESC_COLOR` | #ebdbb2 | HEX color code for repository descriptions in the 'Top Repositories' section. |
| `REPO_NAME_COLOR` | #b8bb26 | HEX color code for repository names in the 'Top Repositories' section. |
| `REPO_STATS_COLOR` | #d3869b | HEX color code for repository stats, such as stars and forks. |
| `STATS_FILL_COLOR` | #ebdbb2 | HEX color code for the stats text, such as followers and repository counts. |
| `TITLE_FILL_COLOR` | #83a598 | HEX color code for the bio/title text in the SVG image. |
| `SHOW_NESSIE_IMAGE` | false | Set to 'true' to display the Nessie image in the SVG, or 'false' to hide it. |
| `LANGUAGE_TEXT_COLOR` | #B0C4DE | HEX color code for programming language names in the language bars. |
| `BACKGROUND_IMAGE_URL` | - | An optional URL to a background image that will be used in the SVG image. |
| `SHOW_AVATAR_BACKGROUND` | true | Set to 'true' to display your GitHub avatar as a background with a transparent overlay. Set to 'false' to disable it. |
| `SECTION_TITLE_FILL_COLOR` | #fe8019 | HEX color code for section titles, such as 'Top Repositories'. |
| `AVATAR_BACKGROUND_OPACITY` | 0.05 | Opacity level for the avatar background, where '0' is fully transparent and '1' is fully opaque. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/FA69vd)
