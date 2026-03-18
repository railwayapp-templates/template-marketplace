# Deploy Change Detection on Railway

Change Detection is an open source tool for monitoring websites for changes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sXmRro)

## About

[Change Detection](https://github.com/dgtlmoon/changedetection.io) is an open source tool for monitoring websites and sending notifications on change.

Make sure to adjust the BASE_URL variable after deploying and adding a domain, to ensure urls inside notifications are correct.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| selenium | `selenium/standalone-chrome-debug:3.141.59` | Worker |
| changedetection | `ghcr.io/dgtlmoon/changedetection.io` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SCREEN_DEPTH` | selenium | 24 | - |
| `SCREEN_WIDTH` | selenium | 1920 | - |
| `SCREEN_HEIGHT` | selenium | 1080 | - |
| `VNC_NO_PASSWORD` | selenium | (secret) | - |
| `BASE_URL` | changedetection | - | Use format https://example.com |
| `HIDE_REFERER` | changedetection | true | - |
| `WEBDRIVER_URL` | changedetection | http://selenium.railway.internal:4444/wd/hub | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/datastore`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/sXmRro)
