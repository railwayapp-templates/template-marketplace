# Deploy Webclaw [Aug '26] (Web Scraper API) on Railway

Rust scraper with REST API and MCP server. Firecrawl alt.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/webclaw-aug-26-web-scraper-api)

## About

Webclaw scrapes web pages and returns clean markdown or structured data over a REST API. Written in Rust, so it starts fast and handles concurrent requests without breaking a sweat. Ships with an MCP server for AI agent integration.

Single Rust binary in a Docker container. No database, no external services. Point it at a URL, get markdown back. The API runs on port 3000 and accepts scrape, crawl, and search requests.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| webclaw | [0xMassi/webclaw](https://github.com/0xMassi/webclaw) | Worker |

**Category:** Other · **Languages:** Rust, Shell, JavaScript, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/webclaw-aug-26-web-scraper-api)
