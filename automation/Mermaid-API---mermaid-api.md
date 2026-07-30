# Deploy Mermaid API on Railway

Render Mermaid diagrams as PNG/SVG via HTTP API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mermaid-api)

## About

This template runs a Node.js Express server with Puppeteer for headless Chromium rendering on Railway. A browser pool manages concurrent diagram rendering with automatic browser reuse and resource cleanup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mermaid-api | [INAPP-Mobile/mermaid-api](https://github.com/INAPP-Mobile/mermaid-api) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MAX_CONCURRENT` | 4 | Maximum concurrent Chromium browser instances for rendering diagrams |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/mermaid-api)
