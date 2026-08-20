# Deploy Directus | (Just Updated) Headless CMS You Can Actually Log Into on Railway

Seeds the admin account a stock deploy never creates. Uploads on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/directus-or-just-updated-headless-cms-yo)

## About

Directus is an open-source headless CMS and data platform: point it at a SQL database and it gives you an admin app, a REST and GraphQL API, roles and permissions, file storage, flows and webhooks over your own schema. This template deploys it with the administrator account already created, because a stock Directus deploy creates no user at all and offers no way to make one.

This template runs Directus 12.3.0 as two services: the app itself with its file library on a persistent volume, and PostgreSQL for the schema, content, users and permissions. The administrator is seeded during the boot sequence, before the public port is ever opened, and the password is re-applied on every boot, so a redeploy doubles as a working password reset. The volume is ownership-repaired before Directus starts, because Railway mounts volumes as root while the Directus image runs as an unprivileged user. `SECRET` is generated once per deployment and published as a template variable, so sessions and tokens survive a restart. The app honours Railway's injected port and is healthchecked on `/server/ping`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| directus | `ghcr.io/bon5co/directus-railway:12.3.0` | Web service |
| postgres | `postgres:17.10-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SECRET` | directus | (secret) |
| `ADMIN_PASSWORD` | directus | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/server/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/directus/uploads`
- **Volume:** `/var/lib/postgresql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/directus-or-just-updated-headless-cms-yo)
