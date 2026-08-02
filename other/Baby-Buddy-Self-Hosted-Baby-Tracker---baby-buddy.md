# Deploy Baby Buddy | Self-Hosted Baby Tracker on Railway

Self-hosted baby tracker: feedings, sleep, diapers, growth. Private.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baby-buddy)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/babybuddy?utm_medium=integration&utm_source=button&utm_campaign=babybuddy)

[Baby Buddy](https://github.com/babybuddy/babybuddy) is a self-hosted baby tracker — log feedings, diaper changes, sleep, tummy time, pumping, growth, and temperature, and see it all on a timeline with charts. Caregivers share one account-protected instance, so parents, grandparents, and sitters stay in sync without handing data to an app company.

This template runs the linuxserver.io Baby Buddy image as a single Railway service. The SQLite database and settings persist on a volume at `/config`. CSRF origins are pre-wired to your Railway domain, so forms work out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| babybuddy | [nomideusz/babybuddy-railway](https://github.com/nomideusz/babybuddy-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Your time zone — timeline entries use it. |
| `PORT` | 8000 | Port for Railway healthcheck probing. Do not change. |
| `CSRF_TRUSTED_ORIGINS` | - | Public URL for Django CSRF protection. Do not change. |

## Configuration

- **Healthcheck:** `/login/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/baby-buddy)
