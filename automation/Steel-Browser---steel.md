# Deploy Steel Browser on Railway

Self-host browser automation for AI agents, scraping, and testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/steel)

## About

Steel Browser is a browser automation platform built for AI agents, web scraping, screenshots, browser testing, and programmable browser sessions. It provides both an API and Web UI for controlling headless browser workloads, making it suitable for applications that require JavaScript rendering, cookies, sessions, and real browser interaction.

Hosting Steel Browser on Railway gives you a self-hosted browser automation service without manually managing Chromium, browser dependencies, or server infrastructure.

This template uses the official combined Steel Browser image, which includes both the API and Web UI in a single service. The service runs on port `3000`, stores browser logs in persistent Railway storage, and can generate public session and debugger URLs using the Railway public domain.

Once deployed, Steel Browser can be accessed through its Web UI or integrated directly with backends, automation services, AI agents, Playwright-compatible workflows, and other browser automation clients.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| steel-browser | `ghcr.io/steel-dev/steel-browser:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind Steel Browser to all network interfaces |
| `PORT` | 3000 | HTTP API port used by Steel Browser |
| `DOMAIN` | - | Public hostname used to generate API and session URLs |
| `NODE_ENV` | production | Run Steel Browser in production mode |
| `CDP_DOMAIN` | - | Public hostname used for CDP and debugger URLs |
| `CHROME_HEADLESS` | true | Run Chrome in headless mode |
| `LOG_STORAGE_PATH` | /data/logs/browser-logs.duckdb | Persistent browser log database path |
| `ENABLE_CDP_LOGGING` | false | Enable detailed Chrome DevTools Protocol logs |
| `LOG_STORAGE_ENABLED` | true | Enable persistent browser log storage |
| `ENABLE_VERBOSE_LOGGING` | false | Enable verbose Steel Browser application logs |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/logs`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/steel)
