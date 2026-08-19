# Deploy Directus | Pinned, With Admin Credentials You Can Find on Railway

Pinned image, admin password in variables instead of the deploy log.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/directus-or-pinned-with-admin-credential)

## About

# Directus

The headless CMS on Postgres with PostGIS, Redis caching and a volume for uploads.
Every image pinned, and admin credentials you can actually find.

## What this fixes

The existing Directus template is well built - PostGIS and Redis are pinned, files
go to S3, caching and websockets are on. Two things are wrong with it.

**The Directus image itself is `:latest`** - the only unpinned image in a stack
that pins everything else. Two deploys a month apart are not the same CMS, and a
redeploy can change the application over a database it has already migrated.

**The administrator credentials only exist in the deploy log.** Directus creates
the first user on bootstrap; with no `ADMIN_EMAIL` and `ADMIN_PASSWORD` set it
generates them and prints them, so getting in means scrolling through logs - and
after the log rotates, or the volume is lost, that password is gone. Here both are
template variables: the password is generated, and it is in your service settings
where you can read it and change it.

## What you get

`directus/directus:12.1.1`, `postgis/postgis:17-3.5`, `redis:8.6.5-alpine`.
Log in at the domain with `admin@example.com` and the generated
`ADMIN_PASSWORD`.

## Verified

By using it. Deployed from this template, logged in with the generated password,
read back the administrator over the API, and created a collection - which is a
schema write, not a health check. A wrong password returns 401.

## Files

Uploads are on a volume at `/directus/uploads` rather than S3, so the template
has no external dependency and nothing to configure. For larger installations
switch `STORAGE_LOCATIONS` to S3 and point it at a bucket; Directus supports
both, and the variables are the ones in its own documentation.

## Configuration

Nothing to fill in. `KEY`, `SECRET`, the database password and the admin password
are all generated. `KEY` and `SECRET` should not be changed after first boot -
they sign sessions and tokens.

Source images and configuration follow the Directus documentation; Directus itself
is by Monospace Inc, under the Directus BSL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostGIS | `postgis/postgis:17-3.5` | Database |
| Redis | `redis:8.6.5-alpine` | Database |
| Directus | `directus/directus:12.2.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | PostGIS | directus |
| `POSTGRES_USER` | PostGIS | (secret) |
| `POSTGRES_PASSWORD` | PostGIS | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | Directus | 8055 |
| `SECRET` | Directus | (secret) |
| `DB_PORT` | Directus | 5432 |
| `DB_USER` | Directus | (secret) |
| `DB_CLIENT` | Directus | pg |
| `ADMIN_EMAIL` | Directus | admin@example.com |
| `CACHE_STORE` | Directus | redis |
| `DB_PASSWORD` | Directus | (secret) |
| `CACHE_ENABLED` | Directus | true |
| `ADMIN_PASSWORD` | Directus | (secret) |
| `CACHE_AUTO_PURGE` | Directus | true |
| `STORAGE_LOCATIONS` | Directus | local |
| `STORAGE_LOCAL_ROOT` | Directus | /directus/uploads |
| `WEBSOCKETS_ENABLED` | Directus | true |
| `STORAGE_LOCAL_DRIVER` | Directus | local |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/directus/uploads`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/directus-or-pinned-with-admin-credential)
