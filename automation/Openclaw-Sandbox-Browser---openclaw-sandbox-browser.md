# Deploy Openclaw Sandbox Browser on Railway

Headless Chromium browser sandbox for automation via CDP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-sandbox-browser)

## About

OpenClaw Sandbox Browser is a headless Chromium browser instance designed for Chrome DevTools Protocol (CDP) control. Built on Debian with a Caddy reverse proxy, Xvfb, and noVNC support, it provides an isolated, sandboxed environment for AI agents like OpenClaw to perform automated web browsing, web scraping, and visual debugging.

Deploying OpenClaw Sandbox Browser on Railway provides a cloud-hosted Chromium instance without requiring you to manage local browser binaries or virtual display servers. Railway provisions and runs the containerized environment directly from the Docker image, handling automated HTTP and TCP proxy routing for CDP communication and optional VNC desktop viewing.

The application operates statelessly in memory, so persistent volumes or external databases are not required. Railway manages HTTPS termination automatically, giving you secure endpoint access to control your browser sandbox remotely. As browser automation demands scale, you can easily adjust compute resources directly within the Railway console.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw Browser Sandbox | `ghcr.io/canyugs/openclaw-sandbox-browser:main` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENCLAW_BROWSER_CDP_PORT` | 9222 |
| `OPENCLAW_BROWSER_HEADLESS` | 1 |
| `OPENCLAW_BROWSER_VNC_PORT` | 5900 |
| `OPENCLAW_BROWSER_NOVNC_PORT` | 6080 |
| `OPENCLAW_BROWSER_ENABLE_NOVNC` | 1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/openclaw-sandbox-browser)
