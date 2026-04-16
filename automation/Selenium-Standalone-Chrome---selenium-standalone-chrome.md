# Deploy Selenium Standalone Chrome on Railway

High-performance Selenium Chrome node for scalable web automation 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selenium-standalone-chrome)

## About

Selenium Standalone Chrome is a ready-to-use browser automation service that runs Chrome in a containerized environment. It exposes a WebDriver endpoint, enabling remote control of headless or full browser sessions for testing, scraping, and automation workflows at scale.

Hosting Selenium Standalone Chrome involves running a containerized browser node that exposes a WebDriver-compatible API (typically on port 4444). This allows external clients (e.g., Python, Node.js) to execute browser automation tasks remotely. When deployed on Railway, the service becomes publicly accessible and scalable, enabling distributed automation workloads without managing infrastructure manually.

With proper configuration (such as concurrent sessions, memory tuning, and Chrome arguments), this setup can handle multiple parallel browser sessions efficiently, making it suitable for high-throughput automation workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| standalone-chrome | `selenium/standalone-chrome` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4444 |
| `START_XVFB` | true |
| `SE_SCREEN_WIDTH` | 1920 |
| `SE_SCREEN_HEIGHT` | 1080 |
| `SE_SESSION_TIMEOUT` | 300 |
| `SE_NODE_CHROME_ARGS` | --disable-dev-shm-usage --no-sandbox --disable-gpu --disable-extensions --disable-infobars --window-size=1920,1080 --headless=new --remote-allow-origins=* |
| `SE_NODE_MAX_SESSIONS` | 4 |
| `SE_NODE_SESSION_TIMEOUT` | 300 |
| `SE_NODE_OVERRIDE_MAX_SESSIONS` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/selenium-standalone-chrome)
