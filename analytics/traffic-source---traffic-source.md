# Deploy traffic-source on Railway

Self-hosted analytics with Stripe tracking & affiliates.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/traffic-source)

## About

Deploy Traffic Source on Railway with one click. Railway handles builds, SSL, and domain provisioning automatically — no server configuration needed.

Traffic Source runs as a single Next.js service on Railway. Your analytics data is stored in a SQLite database file on a persistent Railway Volume — no external database required. Railway auto-provisions a public HTTPS domain and injects it into your environment on deploy.

Make sure the Volume is mounted to `./data` so your database survives redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| traffic-source | [mddanishyusuf/traffic-source](https://github.com/mddanishyusuf/traffic-source) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JWT_EXPIRY` | 7d |
| `JWT_SECRET` | (secret) |
| `DATABASE_PATH` | ./data/analytics.db |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/analytics.db`

**Category:** Analytics · **Languages:** JavaScript, SCSS, Shell

[View on Railway →](https://railway.com/deploy/traffic-source)
