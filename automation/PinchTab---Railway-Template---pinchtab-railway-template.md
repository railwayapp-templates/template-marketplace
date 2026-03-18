# Deploy PinchTab - Railway Template on Railway

Headless Chromium as a REST API. Give your AI agent eyes and hands

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pinchtab-railway-template)

## About

![PinchTab — Browser control for AI agents](https://raw.githubusercontent.com/pinchtab/pinchtab/main/assets/pinchtab-headless.png)

PinchTab is a browser automation bridge that exposes a REST API for controlling Chromium. Built for AI agents, it ships as a 12 MB Go binary with an embedded dashboard — no Selenium, no Puppeteer, no separate browser service. One-click deploy on Railway.

PinchTab runs as a single container that manages multiple isolated Chrome instances, each identified by a profile. It listens on Railway's injected PORT, serves a built-in React dashboard at /dashboard, and exposes its full REST API at /. Authentication is handled via a Bearer token set through the BRIDGE_TOKEN environment variable. A Railway Volume mounted at /data is optional but recommended for persisting browser profiles and state across deploys. The service starts in headless mode by default and is ready to accept requests immediately after the health check passes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pinchtab | [8u9i/pinchtab](https://github.com/8u9i/pinchtab) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BRIDGE_TOKEN` | (secret) | Bearer token for API authentication |
| `BRIDGE_PROFILE` | /tmp/chrome-profile | Path to the Chrome session profile directory |
| `BRIDGE_STATE_DIR` | /tmp/pinchtab-state | Directory for orchestrator state and browser profiles |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** Go, TypeScript, HTML, Shell, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/pinchtab-railway-template)
