# Deploy Cap CAPTCHA | Self-Hosted Proof-of-Work CAPTCHA That Passes Its Health Check on Railway

Self-host Cap on Railway — proof-of-work CAPTCHA, pinned, health-checked.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cap-captcha-or-self-hosted-proof-of-work)

## About

Cap, the open-source proof-of-work CAPTCHA, self-hosted with Valkey. It deploys on the first try: the port, the health check and the volume permissions are set. Every image is pinned.

Nothing to fill in. Open the domain and sign in with the `ADMIN_KEY` from the Cap service's variables.

Cap protects your forms from bots without tracking your visitors. Instead of picking traffic lights, the visitor's browser solves a small computational puzzle in the background; your server then checks the token with Cap. Two services:

- **Cap**: the dashboard, the challenge API the widget talks to, and the `siteverify` endpoint your backend calls (public)
- **Valkey**: site keys, sessions and rate-limit counters, on its own volume, password-protected

Create a site key in the dashboard, add the widget to your page, and verify the token from your backend with the key's secret.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cap | `tiago2/cap:3.1.14` | Web service |
| Valkey | `valkey/valkey:9.0.6-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Cap | 3000 |
| `RATELIMIT_IP_HEADER` | Cap | x-forwarded-for |
| `VALKEY_PASSWORD` | Valkey | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/data`
- **Start command:** `/bin/sh -c "exec valkey-server --requirepass $VALKEY_PASSWORD --save 60 1 --maxmemory-policy noeviction --loglevel warning --dir /data"`
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/cap-captcha-or-self-hosted-proof-of-work)
