# Deploy maillayer on Railway

Mailchimp alternative, self-hosted and truly yours.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/maillayer)

## About

Self-hosted Mailchimp alternative. Bring your own SES, SendGrid, or Mailgun and send unlimited emails. Pay once, own it forever.

- Single Node.js container, SQLite database, persistent volume
- No Postgres, no Redis, no external workers
- In-process queue, cron, and email workers
- Nightly SQLite VACUUM backup at 3 AM
- One-click deploy with managed volume and auto HTTPS

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mddanishyusuf/maillayer-pro:1 | `ghcr.io/mddanishyusuf/maillayer-pro:1` | Database |

## Configuration

- **Volume:** `/app/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/maillayer)
