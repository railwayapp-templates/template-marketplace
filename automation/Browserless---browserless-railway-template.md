# Deploy Browserless on Railway

Headless browser API for automation, scraping, testing, and AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/browserless-railway-template)

## About

Browserless is a headless Chromium service that can be accessed through an API. It is suitable for automation, scraping, testing, screenshots, PDF generation, and AI agents without requiring Chrome to run inside every application.

Browserless runs Chromium as a remote browser service on Railway. Applications connect to it through Puppeteer, Playwright, WebSocket, CDP, or HTTP APIs, while Browserless manages the browser process and session lifecycle.

This architecture separates browser execution from application logic. Your applications do not need to install or maintain Chromium locally, and multiple services can share the same Browserless deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| browserless-chromium | `ghcr.io/browserless/chromium:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CORS` | true | Allow browser-based clients to call Browserless APIs |
| `HOST` | 0.0.0.0 | Listen on all container interfaces |
| `PORT` | 3000 | Railway public service port for Browserless |
| `TOKEN` | (secret) | API token required to authenticate Browserless requests |
| `HEALTH` | true | Enable Browserless health checks |
| `QUEUED` | 5 | Maximum queued requests when all browser sessions are busy |
| `RETRIES` | 5 | Number of browser-launch retry attempts |
| `TIMEOUT` | 300000 | Maximum browser session duration in milliseconds |
| `ALLOW_GET` | true | Allow GET requests for supported Browserless endpoints |
| `CONCURRENT` | 2 | Maximum concurrent browser sessions |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/browserless-railway-template)
