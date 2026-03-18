# Deploy Changedetection.io on Railway

Deploy and Host Changedetection.io with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/changedetectionio)

## About

ChangedDetection is the best and simplest tool for website change detection, web page monitoring, and website change alerts. Perfect for tracking content changes, price drops, restock alerts, and website defacement monitoring

![](https://raw.githubusercontent.com/dgtlmoon/changedetection.io/master/docs/screenshot.png)

- Nothing to install, access via browser login after signup.
Super fast, no registration needed setup.

- Get started watching and receiving website change notifications straight away.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| playwright | `dgtlmoon/sockpuppetbrowser:latest` | Worker |
| changedetection | `linuxserver/changedetection.io:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SCREEN_DEPTH` | playwright | 16 |
| `SCREEN_WIDTH` | playwright | 1920 |
| `SCREEN_HEIGHT` | playwright | 1024 |
| `STATS_REFRESH_SECONDS` | playwright | 120 |
| `MAX_CONCURRENT_CHROME_PROCESSES` | playwright | 10 |
| `TZ` | changedetection | Etc/UTC |
| `PGID` | changedetection | 1000 |
| `PUID` | changedetection | 1000 |
| `PLAYWRIGHT_DRIVER_URL` | changedetection | ws://playwright:3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/changedetectionio)
