# Deploy ntfy - Push notifications made easy on Railway

Push notifications made easy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ntfy-push-notifications-made-easy)

## About

ntfy is a simple HTTP-based pub-sub notification service. Send push notifications to your phone or desktop via scripts from any computer using REST API calls. It's open-source, infinitely flexible, and requires zero configuration to start receiving notifications instantly.

Hosting ntfy on Railway involves deploying a lightweight Go server that provides both web interface and REST API endpoints for topic-based notifications. Users subscribe to topics via web or mobile apps and receive real-time push notifications when messages are published. Railway handles the containerization and scaling automatically, while you can optionally configure authentication, message persistence, file attachments, and rate limiting through environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ntfy | `binwiederhier/ntfy` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `NTFY_UPSTREAM_BASE_URL` | https://ntfy.sh |

## Configuration

- **Start command:** `ntfy serve`
- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/ntfy-push-notifications-made-easy)
