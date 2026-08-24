# Deploy Selenium Standalone Chrome on Railway

Run Chrome browser automation with Selenium WebDriver in just 1 click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selenium-standalone-chrome)

## About

Selenium Standalone Chrome is a ready-to-use remote browser automation service powered by Selenium WebDriver and Google Chrome. It exposes a WebDriver-compatible endpoint so applications can control browser sessions remotely for testing, scraping, QA, screenshot generation, and other browser automation workflows.

This template is optimized for Railway with headless Chrome, shared-memory tuning, configurable concurrency, and Selenium Grid monitoring. It provides a practical remote browser environment without requiring you to maintain a dedicated browser virtual machine or manually configure a Selenium server.

Hosting Selenium Standalone Chrome on Railway gives you a remotely accessible Chrome automation environment that can be used by backend services, test runners, scheduled jobs, and local development tools.

Applications written in Java, C#, and other WebDriver-compatible languages can connect to the Selenium endpoint and create browser sessions on demand. Your application sends commands through the WebDriver protocol, while Chrome runs inside the deployed Selenium container.

Typical workloads include:

* Web scraping and structured data extraction
* End-to-end testing
* Automated form submission
* Login and navigation workflows
* Screenshot and PDF generation
* Browser-based integration testing
* Dynamic website data extraction
* Automated QA pipelines
* Website monitoring
* CI/CD browser testing
* Rendering JavaScript-heavy pages

The browser environment is ephemeral by design. Each session can start with a clean profile, which helps prevent cookies, cache, and temporary files from one job affecting another.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| standalone-chrome | `selenium/standalone-chrome` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4444 | Railway public service port for Selenium Grid |
| `SE_START_VNC` | false | Disable VNC to reduce resource usage |
| `SE_START_XVFB` | true | Start Xvfb for modern Chrome headless mode |
| `SE_SCREEN_DEPTH` | 24 | Virtual display color depth |
| `SE_SCREEN_WIDTH` | 1920 | Virtual screen width |
| `SE_START_NO_VNC` | false | Disable noVNC to reduce resource usage |
| `SE_SCREEN_HEIGHT` | 1080 | Virtual screen height |
| `SE_ENABLE_TRACING` | false | Reduce unnecessary tracing overhead |
| `SE_NODE_CHROME_ARGS` | --no-sandbox --disable-gpu --disable-extensions --window-size=1920,1080 --headless=new --remote-allow-origins=* | - |
| `SE_NODE_MAX_SESSIONS` | 2 | Maximum concurrent Chrome sessions |
| `SE_NODE_SESSION_TIMEOUT` | 300 | Close inactive browser sessions after five minutes |
| `SE_SESSION_REQUEST_TIMEOUT` | 300 | Maximum time session requests can remain queued |
| `SE_NODE_OVERRIDE_MAX_SESSIONS` | true | Allow configured concurrency regardless of detected CPU count |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/selenium-standalone-chrome)
