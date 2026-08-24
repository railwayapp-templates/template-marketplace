# Deploy Lightpanda Browser on Railway

Ultra-fast headless browser for AI agents, scraping, and automation. 🐼

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightpanda-browser)

## About

Lightpanda Browser is a lightweight, headless browser designed for AI agents, web automation, scraping, and testing. It supports the Chrome DevTools Protocol (CDP), making it compatible with popular automation tools such as Playwright and Puppeteer while using an architecture optimized specifically for headless workloads.

Hosting Lightpanda Browser on Railway gives you a remotely accessible CDP-compatible browser without maintaining a full Chromium-based browser environment yourself. This template runs the official Lightpanda Docker image and starts its CDP server on Railway's assigned port.

Once deployed, you can expose the service through a Railway public domain or connect to it internally using Railway private networking. Your applications, automation workers, or AI agents can then retrieve the browser's CDP WebSocket endpoint and control Lightpanda using Playwright, Puppeteer, or another CDP-compatible client.

No PostgreSQL, Redis, or persistent storage is required for the basic deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lightpanda-browser | `lightpanda/browser:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9222 | port |

## Configuration

- **Start command:** `/bin/sh -c 'exec lightpanda serve --host 0.0.0.0 --port "$PORT"'`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/lightpanda-browser)
