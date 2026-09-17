# Deploy FitTrackee on Railway

Self-hosted workout tracker: GPS tracks, maps and statistics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fittrackee)

## About

FitTrackee is a self-hosted training log. Upload the GPS file from a run, ride, hike or ski tour and
it draws the route on a map, works out distance, pace and elevation, and builds statistics across
months and years. Twenty-nine sports, GPX, FIT, TCX and KML imports, and an API other apps can push
to. This is a community-maintained template; it is not affiliated with the FitTrackee project.

FitTrackee is straightforward to host: one application container and one database. The database has
to be PostgreSQL with the PostGIS extension, because the migrations create spatial columns, so a
plain managed PostgreSQL will not do; this template ships the PostGIS image with its own volume. The
application keeps uploaded tracks, workout pictures and its map cache in a second volume.

The part that needs care is who can sign up. A fresh instance has no user limit, and the application
reads that as unlimited, so registration is open to anyone who finds the address. Worse, the first
account to register is an ordinary user: the owner role is granted by a command run against the
container, so on a fresh public instance nobody holds the rights to close the door standing open.
This template creates your account with the owner role before the public port is opened, then closes
registration through the application's own settings. It never lowers a limit you raised yourself, so
inviting other people later is not undone by the next deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db | `postgis/postgis:18-3.6-alpine` | Database |
| app | `ghcr.io/youssefsiam38/fittrackee-railway:1.0.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | db | fittrackee | - |
| `POSTGRES_USER` | db | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | Database password, referenced by the app service. |
| `TZ` | app | UTC | Timezone used for dates. |
| `PORT` | app | 8080 | Port the gate listens on. Railway probes its healthcheck here, so keep it equal to the domain's target port. |
| `UI_URL` | app | - | Public URL, used in the links the application sends out. |
| `DATABASE_URL` | app | - | Connection to the PostGIS database. |
| `APP_SECRET_KEY` | app | (secret) | Signs session tokens. The wrapper refuses upstream's placeholder value. |
| `FITTRACKEE_MAX_USERS` | app | 1 | How many accounts may exist. 0 means unlimited, which leaves registration open to anyone. |
| `FITTRACKEE_OWNER_EMAIL` | app | owner@example.com | That account's e-mail. Change it to your own. |
| `FITTRACKEE_OWNER_PASSWORD` | app | (secret) | That account's password. Sign in with it, then change it in the app. |
| `FITTRACKEE_OWNER_USERNAME` | app | (secret) | Username of the account created on first start. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/uploads`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fittrackee)
