# Deploy Wallos on Railway

Track your recurring subscriptions and what they cost each year

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wallos-railway)

## About

Wallos is an open-source personal subscription tracker that turns scattered recurring charges — streaming, cloud storage, SaaS seats, insurance, broadband — into one dashboard with real numbers attached. Enter a subscription once with its price, billing cycle and next payment date, and Wallos rolls that date forward, converts everything into your main currency, breaks spending down by category and payment method, and warns you before a charge lands. It runs on PHP over an embedded SQLite database, so it costs very little to host, and it suits anyone who wants a paid subscription manager's clarity without giving a company read access to their bank.

Self-host Wallos on Railway and the whole application is one service: nginx and PHP-FPM serving the web UI, with the scheduler behind renewals, exchange rates and notifications in the same container. A volume at `/data` holds the SQLite database and every logo, so data survives redeploys. The template builds from [gridalpha/wallos-railway](https://github.com/gridalpha/wallos-railway), a thin wrapper around the official [bellamy/wallos](https://hub.docker.com/r/bellamy/wallos) image that fits it to Railway's single-volume model, adds a database-aware health check and keeps the scheduled jobs running. No external database or object store is needed.

![Diagram of the Wallos service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787716911/wallos-architecture.png)

Most people underestimate their recurring spend because it arrives in small pieces across a dozen billing cycles. Wallos makes the total visible and warns you before each renewal without touching your bank. The trade is deliberate: you type them in yourself, and nothing about your finances leaves your server.

Key features:

- Any billing cycle — daily, weekly, monthly, yearly or one-time — with automatic roll-forward of the payment date
- Multi-currency with nightly conversion into one main currency
- Categories, payment methods and household members
- Renewal reminders over email, Discord, Telegram, Gotify, Pushover and webhooks
- Statistics and forecasting, a renewal calendar, and built-in logo search
- Multi-user with per-user data, optional OIDC sign-on, 25+ languages

This is one container doing three jobs: nginx serves static assets and passes PHP requests to PHP-FPM, PHP reads and writes a SQLite file, and a cron daemon advances payment dates, refreshes exchange rates and sends notices. Everything that must survive a restart lives on `/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wallos | [gridalpha/wallos-railway](https://github.com/gridalpha/wallos-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Timezone for renewals and cron |
| `PGID` | 82 | gid the application runs as |
| `PORT` | 80 | Port nginx serves and Railway probes |
| `PUID` | 82 | uid the application runs as |
| `WALLOS_DATA_DIR` | /data | Volume path for database and logos |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile, PHP

[View on Railway →](https://railway.com/deploy/wallos-railway)
