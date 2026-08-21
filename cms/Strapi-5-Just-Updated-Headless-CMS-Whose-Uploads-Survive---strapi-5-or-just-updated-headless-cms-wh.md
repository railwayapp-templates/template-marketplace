# Deploy Strapi 5 | (Just Updated) Headless CMS Whose Uploads Survive on Railway

Headless CMS with the admin seeded and uploads on a real volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strapi-5-or-just-updated-headless-cms-wh)

## About

Strapi is the leading open-source headless CMS: model your content types in a browser, then read and write them over an auto-generated REST and GraphQL API with roles, permissions and API tokens. This template deploys Strapi 5 with the super administrator already created and the media library on a volume that Strapi actually writes to, because a stock deploy hands the first stranger who opens the URL a Super Admin account and stores uploads on disposable disk.

This template runs Strapi 5.52.1 as two services: the app, with its media library on a persistent volume, and PostgreSQL for content, users, permissions and tokens. The admin panel is compiled into the image rather than rebuilt on your build minutes, and the upstream version is pinned, which matters on an app that runs forward-only database migrations at boot. The super administrator is seeded by a separate process that must exit before the server binds a port, so the very first request the public URL ever serves already sees a claimed instance. Every secret Strapi needs — `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY` — is generated once per deployment and published as a template variable, so sessions, API tokens and encrypted fields survive a restart. The volume is ownership-repaired before Strapi starts, because Railway mounts volumes as root while this image runs as an unprivileged user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-alpine` | Database |
| strapi | `ghcr.io/bon5co/strapi-railway:5.52.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `JWT_SECRET` | strapi | (secret) |
| `API_TOKEN_SALT` | strapi | (secret) |
| `ADMIN_JWT_SECRET` | strapi | (secret) |
| `TRANSFER_TOKEN_SALT` | strapi | (secret) |
| `STRAPI_ADMIN_PASSWORD` | strapi | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/admin/init`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/strapi-5-or-just-updated-headless-cms-wh)
