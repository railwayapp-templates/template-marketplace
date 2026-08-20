# Deploy Changedetection-io on Railway

Self-hosted website change monitoring with a Chrome fetcher for JS pages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/changedetection-io)

## About

Changedetection.io is an open-source website change monitor. You give it a URL, it fetches that page on a schedule, and when the text differs it shows a highlighted diff and fires a notification — email, Slack, Discord, ntfy, a webhook, or any of the 90-plus targets Apprise supports. Developers watch competitor pricing, changelogs and status pages; legal teams track terms-of-service revisions; restock mode watches a product page for stock and price drops. It is the self-hosted answer to Visualping and Distill.io, with no per-check quota and no third party holding your watch list.

Deploy Changedetection.io on Railway and you get two services wired together. The **changedetection** service runs the application, its fetch workers and the scheduler, with a volume at `/datastore` holding your watches, every snapshot and the app's signing key. The **browser** service runs sockpuppetbrowser, a Chrome proxy that starts an isolated Chrome per request — that is what lets you monitor JavaScript-rendered pages, capture full-page screenshots and use the Visual Filter Selector. Only the app gets a public URL; the browser stays on Railway's private network, and a password is generated at deploy time so nothing is exposed unauthenticated.

![Changedetection.io and its Chromium browser service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787131757/changedetection-io-architecture.png)

Most change-monitoring services are SaaS with a per-check meter and a polling cap. Self-hosting removes both, and keeps your watch list — itself sensitive in a competitive-intelligence context — on infrastructure you control.

Key features:

- Text, HTML, JSON and PDF diffing, with CSS selector, XPath and jq filters
- Visual Filter Selector for picking the tracked element by click
- Restock and price detection for single-product pages
- Trigger and ignore rules so only real changes notify you
- Apprise notifications: email, Slack, Discord, ntfy, webhooks and more
- REST API plus per-watch and global RSS feeds
- Full change history with side-by-side and inline diffs

The architecture is deliberately small: everything lives in files under `/datastore`, so there is no database to run, back up or upgrade. Fetch workers pull watches off a queue — simple pages go through a plain HTTP client, while a Chrome-backed watch opens a WebSocket to the browser service, which renders the page and returns the text plus a full-page screenshot. Chrome concurrency is capped so a burst cannot exhaust container memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| changedetection | [gridalpha/changedetection-io-railway](https://github.com/gridalpha/changedetection-io-railway) | Web service |
| browser | `dgtlmoon/sockpuppetbrowser:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | changedetection | UTC | Timezone for watch scheduling |
| `PORT` | changedetection | 5000 | HTTP listening port |
| `BASE_URL` | changedetection | - | Public URL in notification links |
| `HIDE_REFERER` | changedetection | true | Strip Referer toward monitored sites |
| `LOGGER_LEVEL` | changedetection | INFO | Application log verbosity |
| `FETCH_WORKERS` | changedetection | 5 | Concurrent page fetch workers |
| `PLAYWRIGHT_DRIVER_URL` | changedetection | - | Chrome fetcher WebSocket address |
| `CHANGEDETECTION_PASSWORD` | changedetection | (secret) | UI login password |
| `PORT` | browser | 8080 | Stats port used for health checks |
| `LOG_LEVEL` | browser | INFO | Chrome proxy log verbosity |
| `SCREEN_DEPTH` | browser | 16 | Chrome colour depth |
| `SCREEN_WIDTH` | browser | 1920 | Chrome viewport width |
| `SCREEN_HEIGHT` | browser | 1024 | Chrome viewport height |
| `STATS_REFRESH_SECONDS` | browser | 60 | Stats log interval |
| `MAX_CONCURRENT_CHROME_PROCESSES` | browser | 3 | Simultaneous Chrome instance cap |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/datastore`

**Category:** Automation · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/changedetection-io)
