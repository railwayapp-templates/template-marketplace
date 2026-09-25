# Deploy Mailpit on Railway

Mailpit 1.31 email testing server with SMTP, web UI and REST API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mailpit-2)

## About

Mailpit is an email and SMTP testing tool for developers. Applications send mail to its SMTP server instead of real inboxes, and you inspect every message in a fast web UI with HTML previews, headers, attachments, link checks and spam scores. A REST API lets integration tests assert on sent emails.

This template deploys Mailpit v1.31.2 from the official image as a single service. Messages are stored in SQLite on a Railway volume, so they survive redeploys, and the store keeps the newest 5,000 messages. The web UI and API are protected with a generated login. SMTP requires authentication too, with a separate generated password. Services on Railway send over the private network on port 1025, and external apps use the Railway TCP proxy. Mailpit never delivers mail to real recipients, so it is safe for staging environments and fits on the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:v1.31.2` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8025 |
| `MP_DATABASE` | /data/mailpit.db |
| `MP_MAX_MESSAGES` | 5000 |
| `MP_SMTP_PASSWORD` | (secret) |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | true |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1025
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mailpit-2)
