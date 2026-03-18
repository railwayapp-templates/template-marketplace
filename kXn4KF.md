# Deploy browserless-with-chrome on Railway

Browserless with Chrome not Chromium

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kXn4KF)

## About

These environment variables configure a secure Browserless server with Chrome for headless browsing. They define connection endpoints, token-based security, WebSocket/Playwright support, queue limits, concurrency, session timeouts, and public/private access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| browserless | [omtera/browserless](https://github.com/omtera/browserless) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CORS` | true |
| `TOKEN` | (secret) |
| `QUEUED` | 10 |
| `TIMEOUT` | 300000 |
| `CONCURRENT` | 10 |
| `BROWSER_TOKEN` | (secret) |
| `BROWSER_PORT_PRIVATE` | 3001 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/kXn4KF)
