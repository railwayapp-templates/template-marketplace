# Deploy Cap on Railway

The self-hosted CAPTCHA for the modern web. Official template for Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cap-1)

## About

Cap's official Railway template includes everything built-in, including a Valkey database and the v3 dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cap | `tiago2/cap:3` | Web service |
| Valkey | `valkey/valkey:9-alpine` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_KEY` | - | Your admin panel's key |
| `REDIS_URL` | - | Internal Redis/Valkey DB url |
| `RATELIMIT_IP_HEADER` | x-forwarded-for | Header used for IP-based ratelimiting |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/data`
- **Start command:** `valkey-server --save 60 1 --maxmemory-policy noeviction --loglevel warning`
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/cap-1)
