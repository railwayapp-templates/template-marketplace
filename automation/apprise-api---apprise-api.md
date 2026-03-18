# Deploy apprise-api on Railway

A lightweight REST API gateway supporting 120+ notification services.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apprise-api)

## About

Apprise API is a lightweight REST framework built on Django and Gunicorn that wraps the [Apprise Notification Library](https://github.com/caronc/apprise). It provides a unified API to send notifications to 120+ services (Slack, Telegram, Discord, Email, SMS, Pushover, etc.) from a single endpoint. The container runs Nginx + Gunicorn via Supervisord, exposing port 8000. Configuration and attachments are persisted to disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apprise-api | `caronc/apprise:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PGID` | 1000 |
| `PORT` | 8000 |
| `PUID` | 1000 |
| `APPRISE_ADMIN` | y |
| `APPRISE_WORKER_COUNT` | 1 |
| `APPRISE_STATEFUL_MODE` | simple |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/apprise-api)
