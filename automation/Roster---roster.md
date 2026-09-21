# Deploy Roster on Railway

Team channels and threads, where the threads run agents on real repos.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/roster)

## About

Roster is Superset, multiplayer: channels and threads for a team, where the
threads run agents on real repos. This template deploys the whole thing — the
web app, its database, and the realtime transport — as three connected services.

Roster is a Next.js application backed by Postgres, with Centrifugo carrying
messages in realtime. The web service builds from the repository's Dockerfile
and applies its own database migrations on boot, so a fresh Postgres volume
becomes a working schema during the first deploy with nothing to run by hand.
The services reach each other over Railway's private network; only the web app
and Centrifugo take public domains. Sign-in is by magic link, which is why the
only configuration this template asks for is how mail goes out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [harshithmullapudi/roaster](https://github.com/harshithmullapudi/roaster) | Web service |
| centrifugo | `centrifugo/centrifugo:v6.9.6` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `RESEND_API_KEY` | web | (secret) |
| `BETTER_AUTH_SECRET` | web | (secret) |
| `CENTRIFUGO_API_KEY` | web | (secret) |
| `SUPERSET_KEY_SECRET` | web | (secret) |
| `CENTRIFUGO_TOKEN_HMAC_SECRET` | web | (secret) |
| `CENTRIFUGO_HTTP_API_KEY` | centrifugo | (secret) |
| `CENTRIFUGO_CLIENT_TOKEN_HMAC_SECRET_KEY` | centrifugo | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, CSS, Rust, Python, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/roster)
