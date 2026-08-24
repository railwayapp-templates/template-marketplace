# Deploy Selenium Grid on Railway

Run Chrome, Firefox, and Edge automation in parallel with Selenium Grid.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selenium-grid)

## About

Selenium Grid is a distributed browser automation platform for running tests and automation workloads across multiple browsers from a single WebDriver endpoint.

This template deploys a complete Selenium Grid environment with **Chrome, Firefox, and Edge nodes** connected to a central Selenium Hub, making it easy to run cross-browser tests and parallel browser automation without managing separate browser machines manually.

![Selenium Grid](https://imgur.com/qJkGKbw.png)

Selenium Grid separates browser execution from your application or test runner.

Your automation client connects to a single Selenium Hub endpoint, while the Grid routes each requested session to an available browser node.

This template includes:

* **Selenium Hub** — central WebDriver endpoint and Grid controller
* **Chrome Node** — runs Google Chrome automation sessions
* **Firefox Node** — runs Mozilla Firefox automation sessions
* **Edge Node** — runs Microsoft Edge automation sessions

Only the Selenium Hub needs to be publicly accessible. Browser nodes communicate with the Hub through Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| node-edge | `selenium/node-edge:latest` | Worker |
| node-chrome | `selenium/node-chrome:latest` | Worker |
| node-firefox | `selenium/node-firefox:latest` | Worker |
| selenium-hub | `selenium/hub:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SE_START_VNC` | node-edge | false | Disable VNC |
| `SE_START_XVFB` | node-edge | true | Start virtual display |
| `SE_START_NO_VNC` | node-edge | false | Disable noVNC |
| `SE_ENABLE_TRACING` | node-edge | false | Disable Selenium tracing |
| `SE_EVENT_BUS_HOST` | node-edge | - | Selenium Hub private hostname |
| `SE_NODE_MAX_SESSIONS` | node-edge | 1 | Maximum concurrent Edge sessions |
| `SE_NODE_SESSION_TIMEOUT` | node-edge | 300 | Close stale sessions after five minutes |
| `SE_EVENT_BUS_PUBLISH_PORT` | node-edge | 4442 | Hub Event Bus publish port |
| `SE_EVENT_BUS_SUBSCRIBE_PORT` | node-edge | 4443 | Hub Event Bus subscribe port |
| `SE_NODE_OVERRIDE_MAX_SESSIONS` | node-edge | false | Keep the recommended concurrency limit |
| `SE_START_VNC` | node-chrome | false | Disable VNC to reduce resource usage |
| `SE_START_XVFB` | node-chrome | true | Start virtual display required by browser container |
| `SE_START_NO_VNC` | node-chrome | false | Disable noVNC browser viewer |
| `SE_ENABLE_TRACING` | node-chrome | false | Disable tracing to reduce overhead |
| `SE_EVENT_BUS_HOST` | node-chrome | - | Selenium Hub private hostname |
| `SE_NODE_MAX_SESSIONS` | node-chrome | 1 | Maximum concurrent Chrome sessions on this node |
| `SE_NODE_SESSION_TIMEOUT` | node-chrome | 300 | Close stale browser sessions after five minutes |
| `SE_EVENT_BUS_PUBLISH_PORT` | node-chrome | 4442 | Hub Event Bus publish port |
| `SE_EVENT_BUS_SUBSCRIBE_PORT` | node-chrome | 4443 | Hub Event Bus subscribe port |
| `SE_NODE_OVERRIDE_MAX_SESSIONS` | node-chrome | false | Keep Selenium's recommended CPU-based session limit |
| `SE_START_VNC` | node-firefox | false | Disable VNC |
| `SE_START_XVFB` | node-firefox | true | Start virtual display |
| `SE_START_NO_VNC` | node-firefox | false | Disable noVNC |
| `SE_ENABLE_TRACING` | node-firefox | false | Disable Selenium tracing |
| `SE_EVENT_BUS_HOST` | node-firefox | - | Selenium Hub private hostname |
| `SE_NODE_MAX_SESSIONS` | node-firefox | 1 | Maximum concurrent Firefox sessions |
| `SE_NODE_SESSION_TIMEOUT` | node-firefox | 300 | Close stale sessions after five minutes |
| `SE_EVENT_BUS_PUBLISH_PORT` | node-firefox | 4442 | Hub Event Bus publish port |
| `SE_EVENT_BUS_SUBSCRIBE_PORT` | node-firefox | 4443 | Hub Event Bus subscribe port |
| `SE_NODE_OVERRIDE_MAX_SESSIONS` | node-firefox | false | Keep the recommended concurrency limit |
| `PORT` | selenium-hub | 4444 | Railway public service port for Selenium Grid |
| `SE_ENABLE_TRACING` | selenium-hub | false | Disable OpenTelemetry tracing to reduce runtime overhead |
| `SE_SESSION_RETRY_INTERVAL` | selenium-hub | 5 | Interval in seconds between attempts to match queued sessions |
| `SE_SESSION_REQUEST_TIMEOUT` | selenium-hub | 300 | Maximum time a new session request can stay queued |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/selenium-grid)
