# Deploy Steel Browser | Open-Source Headless Browser API on Railway

Self-host Steel Browser. Headless API for AI agents, scraping & automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/steel-browser)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/steel-browser?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Deploy Steel Browser on Railway to get a fully managed, self-hosted headless browser API for your AI agents and automation pipelines. Steel Browser is an open-source browser sandbox that provides REST and WebSocket APIs on top of Chrome, with built-in session management, anti-detection, ad blocking, and proxy support. This template deploys the combined Steel Browser image with persistent log storage on a Railway volume.

Steel Browser is an open-source headless browser API built for AI agents, web scrapers, and automation tools. It wraps Chromium in a managed REST/WebSocket API layer, handling the infrastructure complexity of running browsers at scale.

- **Session management** — persistent browser sessions with cookies, localStorage, and authentication state
- **Anti-detection** — stealth plugins, fingerprint management, and human-like browsing patterns
- **Built-in scraping** — `/v1/scrape`, `/v1/screenshot`, and `/v1/pdf` endpoints for quick data extraction
- **CDP access** — full Chrome DevTools Protocol via WebSocket for Puppeteer, Playwright, and Selenium
- **Ad blocking and proxy support** — configurable per session via API parameters
- **Live session viewer** — built-in UI dashboard for debugging and monitoring sessions

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Steel Browser | `ghcr.io/steel-dev/steel-browser:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | HTTP server listening port |
| `DOMAIN` | - | Public-facing API domain |
| `CDP_DOMAIN` | - | Chrome DevTools Protocol endpoint |
| `LOG_STORAGE_PATH` | /data/browser-logs.duckdb | DuckDB log file on volume |
| `LOG_STORAGE_ENABLED` | true | Enable persistent browser logs |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/steel-browser)
