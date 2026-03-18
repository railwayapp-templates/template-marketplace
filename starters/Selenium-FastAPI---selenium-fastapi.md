# Deploy Selenium + FastAPI on Railway

Lightweight Selenium and FastAPI template for fast scraping on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selenium-fastapi)

## About

Selenium + FastAPI is a compact starter setup for running browser-driven scraping inside a container. It bundles headless Chromium, a tuned ChromeDriver configuration, and a clean API layer so scraping tasks can be triggered easily through HTTP.

Hosting Selenium + FastAPI on Railway ensures that all components needed for headless browser tasks run smoothly inside a managed container. Railway handles build steps, networking, environment variables, and scaling, while your service focuses on fetching pages, running browser actions, and parsing data through FastAPI endpoints. The system avoids manual browser setup and remains light enough for small plans. You can extend it with schedulers, queues, or new endpoints without touching the core setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| selenium-fastapi | [codestorm-official/selenium-fastapi](https://github.com/codestorm-official/selenium-fastapi) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CHROMEDRIVER_PATH` | /usr/bin/chromedriver | CHROMEDRIVER_PATH |
| `GOOGLE_CHROME_BIN` | /usr/bin/chromium | CHROMEDRIVER_PATH |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/selenium-fastapi)
