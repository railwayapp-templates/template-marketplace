# Deploy wish-glance on Railway

A Clone of Glance with GitHub Gist API and single volume support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/UGcNz8)

## About

Note: 
- Not recommended for API keys or any secret files.
 
### How to Use `GIST_ID` and `CONFIG_FILES`

`GIST_ID`
- Set this to the ID of a public GitHub Gist that contains your text-based configuration files (such as .yml, .css, .js, etc.).
- The app will automatically download all files in /app/config.

`CONFIG_FILES`
- Use this as an alternative to `GIST_ID` when you want to provide direct URLs to your config files.
- Provide a comma-separated list of URLs; each file will be downloaded and stored in /app/config.

If `GIST_ID` is set and non-empty:
- Only the files from the Gist will be downloaded.
- The value in `CONFIG_FILES` will be completely ignored — no files from it will be downloaded.
This ensures there's no duplication or confusion about the source of config files.

## Features
### Various widgets
* RSS feeds
* Subreddit posts
* Hacker News posts
* Weather forecasts
* YouTube channel uploads
* Twitch channels
* Market prices
* Docker containers status
* Server stats
* Custom widgets
* [and many more...](https://github.com/glanceapp/glance/blob/main/docs/configuration.md)

### Fast and lightweight
* Low memory usage
* Few dependencies
* Minimal vanilla JS
* Single &lt;20mb binary available for multiple OSs &amp; architectures and just as small Docker container
* Uncached pages usually load within ~1s (depending on internet speed and number of widgets)

### Tons of customizability
* Different layouts
* As many pages/tabs as you need
* Numerous configuration options for each widget
* Multiple styles for some widgets
* Custom CSS

### Optimized for mobile devices
Because you'll want to take it with you on the go.

[mobile-preview](https://raw.githubusercontent.com/glanceapp/glance/refs/heads/main/docs/images/mobile-preview.png)


### Themeable
Easily create your own theme by tweaking a few numbers or choose from one of the [already available themes](https://github.com/glanceapp/glance/blob/main/docs/themes.md).

[themes-example](docs/images/themes-example.png)

## Feature requests

New feature suggestions are always welcome and will be considered, though please keep in mind that some of them may be out of scope for what the project is trying to achieve (or is reasonably capable of). If you have an idea for a new feature and would like to share it, you can do so [here](https://github.com/glanceapp/glance/issues/new?template=feature_request.yml).

Feature requests are tagged with one of the following:

* [Roadmap](https://github.com/glanceapp/glance/labels/roadmap) - will be implemented in a future release
* [Backlog](https://github.com/glanceapp/glance/labels/backlog) - may be implemented in the future but needs further feedback or interest from the community
* [Icebox](https://github.com/glanceapp/glance/labels/icebox) - no plans to implement as it doesn't currently align with the project's goals or capabilities, may be revised at a later date

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wish-Glance | `ghcr.io/wish-oss/wish-glance:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GIST_ID` | - | Set this to the ID of a public or private GitHub Gist that contains your text-based configuration files (such as .yml, .css, .js, etc.). The app will automatically download all files from the Gist and place them in /app/config. |
| `CONFIG_FILES` | https://raw.githubusercontent.com/glanceapp/glance/refs/heads/main/docs/glance.yml | Use this as an alternative to GIST_ID when you want to provide direct URLs to your config files. Provide a comma-separated list of URLs; each file will be downloaded and stored in /app/config. Example: CONFIG_FILES=https://example.com/glance.yml,https://example.com/home.yml |

## Configuration

- **Start command:** `/bin/sh -c '[ -n "$GIST_ID" ] && API_URL="https://api.github.com/gists/$GIST_ID" && FILES=$(curl -s $API_URL | jq -r ".files | to_entries[] | .value.raw_url") || FILES=$(echo "$CONFIG_FILES" | tr "," " "); for FILE_URL in $FILES; do [ -n "$FILE_URL" ] && FILE_NAME=$(basename "$FILE_URL") && DEST_PATH="/app/config/$FILE_NAME" && echo "Downloading $FILE_NAME..." && wget -q -O "$DEST_PATH" "$FILE_URL" && echo "$FILE_NAME has been downloaded."; done; for VAR in CUSTOM_CSS FAVICON LOGO; do URL=$(eval echo \$$VAR); [ -n "$URL" ] && FILE_NAME=$(basename "$URL") && DEST_PATH="/app/config/$FILE_NAME" && echo "Downloading $FILE_NAME..." && wget -q -O "$DEST_PATH" "$URL" && echo "$FILE_NAME has been downloaded."; done; echo "Starting Glance..." && ./glance --config /app/config/glance.yml'`
- **Healthcheck:** `/api/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/UGcNz8)
