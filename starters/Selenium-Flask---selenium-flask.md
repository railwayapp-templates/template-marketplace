# Deploy Selenium + Flask on Railway

Lightweight Selenium and Flask template for quick scraping on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/selenium-flask)

## About

Hosting Selenium + Flask on Railway means your scraping logic runs in a containerized environment with headless Chromium available out of the box. You expose your scraping actions as HTTP routes, and Railway handles build, deploy, and scaling. This setup avoids messy local ChromeDriver installs and makes it easy to create small automation workers or integrate them into larger systems.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| selenium-flask | [codestorm-official/selenium-flask](https://github.com/codestorm-official/selenium-flask) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CHROMEDRIVER_PATH` | /usr/bin/chromedriver | CHROMEDRIVER_PATH |
| `GOOGLE_CHROME_BIN` | /usr/bin/chromium | GOOGLE_CHROME_BIN |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/selenium-flask)
