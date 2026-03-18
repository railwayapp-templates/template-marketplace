# Deploy animepahe-api on Railway

Deploy and Host animepahe-api with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/animepahe-api)

## About

AnimepaheAPI is an unofficial REST API for Animepahe that provides anime information, episodes, and streaming links.

This API requires specific configurations and dependencies to handle web scraping, browser automation, and cookie management. Railway provides an ideal environment with its automated deployment pipeline, environment variable management, and ability to handle long-running processes required for browser automation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| animepahe-api | [ElijahCodes12345/animepahe-api](https://github.com/ElijahCodes12345/animepahe-api) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `COOKIES` | - | Cookie Configuration |
| `PROXIES` | - | Format: http://proxy1.com:8080,http://user:pass@proxy2.com:8080 |
| `BASE_URL` | https://animepahe.ru | - |
| `USE_PROXY` | true | Proxy Configuration |
| `USER_AGENT` | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 | - |

**Category:** Other

[View on Railway →](https://railway.com/deploy/animepahe-api)
