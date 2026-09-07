# Deploy cap-template on Railway

Self-hosted proof-of-work CAPTCHA: Cap standalone + Valkey, zero config

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cap-template)

## About

Hosting Cap on Railway runs two small containers: the `cap` server (`tiago2/cap:3.1.11`, a
pinned upstream tag) behind a public domain on port 3000, and a private `valkey` store
(`valkey/valkey:9-alpine`) reachable only over Railway's internal network, with a `/data`
volume so site keys and in-flight challenges survive restarts and redeploys. The dashboard
login secret (`ADMIN_KEY`) is generated fresh for every deployment by Railway's secret
generator — no secrets are stored in the template or the repo — and `REDIS_URL` points at
Valkey via a service reference, so the deploy form asks for nothing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valkey | `valkey/valkey:9-alpine` | Database |
| cap | `tiago2/cap:3.1.11` | Web service |

## Configuration

- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cap-template)
