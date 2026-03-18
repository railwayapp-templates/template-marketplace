# Deploy Changedetection on Railway

Monitor and detect website changes with alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/changedetection)

## About

Changedetection.io is a self-hosted website change detection and notification service. It monitors web pages for content changes—tracking price drops, restocks, content updates, and API modifications—then sends instant alerts via Discord, Slack, Email, Telegram, or webhooks.

Hosting Changedetection.io requires a containerized deployment with persistent storage for watch configurations and notification history. The application runs as a Python-based web service on port 8080, storing all data in a `/datastore` directory. For JavaScript-heavy websites, this template includes SockpuppetBrowser for full page rendering via private networking. Railway's single-volume architecture works well here since all application data consolidates under one mount point.

![Changedetection.io Homepage](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/changedetection-homepage.png)

![Changedetection.io Configuration](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/changedetection-config.png)

![Changedetection.io Diff View](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/changedetection-diff.png)

![Changedetection.io Screenshot](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/changedetection-screenshot.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ChangeDetection | `dgtlmoon/changedetection.io:latest` | Web service |
| SockpuppetBrowser | `dgtlmoon/sockpuppetbrowser:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `TZ` | ChangeDetection | UTC |
| `HIDE_REFERER` | ChangeDetection | true |
| `LOGGER_LEVEL` | ChangeDetection | INFO |
| `FETCH_WORKERS` | ChangeDetection | 10 |
| `SCREEN_WIDTH` | SockpuppetBrowser | 1920 |
| `SCREEN_HEIGHT` | SockpuppetBrowser | 1080 |

## Configuration

- **Healthcheck:** `/worker-health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/datastore`

**Category:** Other

[View on Railway →](https://railway.com/template/changedetection)
