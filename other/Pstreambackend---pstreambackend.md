# Deploy Pstreambackend on Railway

⚠️⚠️⚠️A template for Pstream backend ⚠️⚠️⚠️LOOK AT NOTICE BELOW

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pstreambackend)

## About

Host you own data on pstream because you are better :)

Use it if you like faster speeds about 90% of the time. Make sure to set your region that is closest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| backend-0jhv | [xp-technologies-dev/backend](https://github.com/xp-technologies-dev/backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `CAPTCHA` | backend-0jhv | false | - |
| `META_NAME` | backend-0jhv | - | Name for your Backend |
| `DATABASE_URL` | backend-0jhv | - | DO NOT TOUCH |
| `TMDB_API_KEY` | backend-0jhv | (secret) | p-stream.github.io/docs/backend/configuration for info |
| `CRYPTO_SECRET` | backend-0jhv | (secret) | - |
| `TRAKT_CLIENT_ID` | backend-0jhv | - | p-stream.github.io/docs/backend/configuration for info |
| `META_DESCRIPTION` | backend-0jhv | - | Describe your cool server :) |
| `CAPTCHA_CLIENT_KEY` | backend-0jhv | - | p-stream.github.io/docs/backend/configuration for info |
| `TRAKT_CLIENT_SECRET` | backend-0jhv | (secret) | p-stream.github.io/docs/backend/configuration for info |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/pstreambackend)
