# Deploy Activepieces | (Just Updated) Zapier Alternative Nobody Else Can Claim on Railway

Anyone with the URL can claim a stock Activepieces. Ours seeds the admin.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-or-just-updated-zapier-alte)

## About

Activepieces is an open-source no-code automation platform — a self-hosted Zapier or Make alternative. You build flows in a visual editor, connect hundreds of pieces (HTTP, Gmail, Slack, Postgres, OpenAI and more), and run them on triggers, schedules or webhooks. This template deploys it with the administrator account already created, because on a stock deploy the first stranger who opens the URL becomes the platform owner.

This template runs Activepieces 0.82.0 as three services: the application, PostgreSQL for flows, runs and users, and Redis for the job queue. Both datastores keep a persistent volume, and Redis runs with a password and an append-only file. The administrator is seeded on an internal port that Railway's edge does not route, and only once that account exists is the public port opened — so the sign-up window a stock deploy leaves open never exists here. The credential is re-applied on every boot, so a redeploy is a working password reset. The container refuses to start on an empty or too-short admin password, and every setting a deployer should not have to know — the frontend URL, the Postgres connection, the execution mode — is derived at boot or baked into the image, so the deploy form asks for nothing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-alpine` | Database |
| redis | `redis:8.2.1-alpine` | Database |
| activepieces | `ghcr.io/bon5co/activepieces-railway:0.82.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `AP_JWT_SECRET` | activepieces | (secret) |
| `AP_ADMIN_PASSWORD` | activepieces | (secret) |
| `AP_POSTGRES_PASSWORD` | activepieces | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-or-just-updated-zapier-alte)
