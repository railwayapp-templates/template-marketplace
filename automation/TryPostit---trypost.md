# Deploy TryPost.it on Railway

Open-Source Social Media Scheduling & Automation Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trypost)

## About

TryPost ships as one Docker image. It runs the web app, queue workers, scheduler, and WebSocket server in the same container, so there are no extra processes to wire up. The only things it needs are PostgreSQL and Redis. You deploy the image, attach the Postgres and Redis plugins, and the container migrates the database, generates keys, and caches config on first boot. Hosting it yourself keeps your posts, drafts, connected accounts, and analytics on infrastructure you control, with no per-seat subscription.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trypostit/trypost:latest | `ghcr.io/trypostit/trypost:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `APP_ENV` | production |
| `APP_NAME` | TryPost |
| `APP_DEBUG` | false |
| `CACHE_STORE` | redis |
| `DB_PASSWORD` | (secret) |
| `DB_USERNAME` | (secret) |
| `LOG_CHANNEL` | stderr |
| `MAIL_MAILER` | sendkit |
| `REVERB_HOST` | localhost |
| `REVERB_PORT` | 8080 |
| `SELF_HOSTED` | true |
| `DB_CONNECTION` | pgsql |
| `REVERB_APP_ID` | 1001 |
| `REVERB_SCHEME` | http |
| `MAIL_FROM_NAME` | TryPost |
| `REVERB_APP_KEY` | trypost-reverb-key |
| `SESSION_DRIVER` | database |
| `TRYPOST_TARGET` | production |
| `FILESYSTEM_DISK` | public |
| `SENDKIT_API_KEY` | (secret) |
| `QUEUE_CONNECTION` | redis |
| `MAIL_FROM_ADDRESS` | hello@example.com |
| `REVERB_APP_SECRET` | (secret) |
| `BROADCAST_CONNECTION` | reverb |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/trypost)
