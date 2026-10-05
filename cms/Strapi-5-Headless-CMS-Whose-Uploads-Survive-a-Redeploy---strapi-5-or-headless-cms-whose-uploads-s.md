# Deploy Strapi 5 | Headless CMS Whose Uploads Survive a Redeploy on Railway

Self-host Strapi 5 on Railway — Postgres, uploads that survive a redeploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strapi-5-or-headless-cms-whose-uploads-s)

## About

Strapi 5, the open-source headless CMS, on Postgres, with uploaded media on a volume mounted where Strapi actually writes it, so images survive a redeploy.

Nothing to fill in. Open `/admin` on the domain and create the first administrator.

Two services:

- **Strapi** 5.56, built from [ak40u/strapi-railway-starter](https://github.com/ak40u/strapi-railway-starter): the admin panel and the REST API, with a volume for the media library (public)
- **Postgres 17**: content types and entries, on its own volume and on the private network only

Model your content types in the admin panel's Content-Type Builder, then read them through `/api/`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.11-alpine` | Database |
| Strapi | [ak40u/strapi-railway-starter](https://github.com/ak40u/strapi-railway-starter) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | strapi |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Strapi | 1337 |
| `JWT_SECRET` | Strapi | (secret) |
| `API_TOKEN_SALT` | Strapi | (secret) |
| `DATABASE_CLIENT` | Strapi | postgres |
| `ADMIN_JWT_SECRET` | Strapi | (secret) |
| `TRANSFER_TOKEN_SALT` | Strapi | (secret) |
| `STRAPI_TELEMETRY_DISABLED` | Strapi | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/public/uploads`

**Category:** CMS · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/strapi-5-or-headless-cms-whose-uploads-s)
