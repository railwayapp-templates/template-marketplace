# Deploy gabe on Railway

This is Gabe, a Discord bot with various capabilities.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gabe)

## About

Hosting Gabe involves running a Node.js 22+ application with a configured Discord bot token and database connection. Gabe supports SQLite for lightweight deployments and PostgreSQL for production-grade setups. Optional features like music require a Lavalink v4 server. Railway simplifies this process by handling runtime, scaling, environment variables, and optional database provisioning, allowing you to deploy Gabe without managing your own VPS or infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| thesomewhatyou/gabe:latest | `ghcr.io/thesomewhatyou/gabe:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | - | Debugging logs. Optional, not recommended. Boolean.   |
| `OWNER` | - | Your Discord user ID. Needed for admin commands. |
| `TENOR` | - | Tenor API key. Used for editing GIFs. Deprecated, but if you have one, use it here! |
| `TOKEN` | (secret) | This is your bot token. secret.  |
| `API_TYPE` | ws | Alternate image API.  |
| `NODE_ENV` | - | Look this up online.  |
| `NODE_ARGS` | - | Node arguments. Don't use unless you know what you're doing.  |
| `REST_PROXY` | - | Discord REST proxy. Optional. To be set by you. |
| `SENTRY_DSN` | https://4a5932a0d6d3a684cb5027cf5cfc8e44@o4510443708088320.ingest.us.sentry.io/4510693175525376 | Sentry DSN. For bug issues. This routes to our community DSN, but completely optional.  |

**Category:** Bots

[View on Railway →](https://railway.com/template/gabe)
