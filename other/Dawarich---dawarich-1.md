# Deploy Dawarich on Railway

GPS location history and timeline. Google Timeline, OwnTracks, Traccar.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dawarich-1)

## About

# Dawarich on Railway

One-click template for [Dawarich](https://dawarich.app), a self-hosted location history tracker and private alternative to Google Timeline. Track your location with the Dawarich mobile app, OwnTracks, or Overland; import your Google Takeout history; visualize trips, visits, stats, and heatmaps on your own server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dawarich-1?referralCode=n_w7cK&amp;utm_medium=integration&amp;utm_source=template&amp;utm_campaign=dawarich)

&gt; **Reference deploy verified 2026-08-06** against Dawarich 1.11.0: healthcheck ok, seeded login works, GPS point ingested via the OwnTracks API and confirmed in the database, authenticated map renders, sidekiq processing jobs, postgres data survived repeated redeploys.

---

## What gets deployed

| Service | Image | Purpose |
|---|---|---|
| **Dawarich** | `freikin/dawarich:latest` | Rails web app **and** Sidekiq background worker, run together by foreman. Public HTTP on port 3000, volume at `/var/app/storage`. |
| **Postgres** | `postgis/postgis:17-3.5-alpine` | Database. PostGIS is required by Dawarich, so Railway's managed Postgres won't work. Volume at `/var/lib/postgresql/data`. |
| **Redis** | `redis:8.2.1` | Job queue for the background worker. Volume at `/data`. Config mirrored from Railway's verified Redis Inc. template (do not use Bitnami images; their public Docker Hub tags were purged in Aug 2025). |

All secrets (`SECRET_KEY_BASE`, database and Redis passwords) are generated per deploy with `${{secret()}}`. Services talk over Railway's private network; only the app is public. Expect roughly 1.6 GB of steady RAM across the three services on an idle instance.

### Why web + worker share one service

Dawarich stores uploaded files (imports/exports) on local disk by default, and both the web process and the worker need to read them. Railway volumes cannot be attached to two services, so splitting web and Sidekiq into separate services silently breaks file imports. Running both under foreman in one container keeps a single volume and keeps RAM low (`WEB_CONCURRENCY=1`, 3 worker threads, upstream's own defaults for a household instance). If either process dies, foreman exits and Railway restarts the container.

---

## Deployer guide

### 1. Deploy

Click the Deploy button, confirm, and wait. The first boot runs the full database migration set and seeds country boundary data, so give it 3 to 6 minutes before the healthcheck goes green.

### 2. First login

Open the Dawarich service's public URL and log in with the default account every Dawarich install ships with:

- **Email:** `demo@dawarich.app`
- **Password:** `safepassword`

**Change both immediately** (top-right menu, Account / Settings). This default is public knowledge.

### 3. Get your API key

Your API key is shown in Account settings. Every tracking client below authenticates with it.

### 4. Start tracking

Pick one (all can run simultaneously):

- **Dawarich mobile app** (iOS/Android): enter your instance URL and API key.
- **OwnTracks**: point it at `https:///api/v1/owntracks/points?api_key=`.
- **Overland**: point it at `https:///api/v1/overland/batches?api_key=`.

Full client setup docs: 

### 5. Import existing history

Settings, Imports in the web UI. Supported: Google Takeout (Records.json / Semantic History), GPX, GeoJSON, OwnTracks exports, and more. Uploads are stored on the service volume and processed by the background worker; large Takeout archives can take a while, watch progress under Imports.

Note: Dawarich's "watched folder" import feature does not work on this template (Railway allows one volume per service, and the watched dir is not on it). Use the web UI or API for imports.

### 6. Optional configuration

Set these on the Dawarich service (Variables tab). Full list: [Dawarich environment variables](https://dawarich.app/docs/self-hosting/environment-variables/).

| Variable | Default | Notes |
|---|---|---|
| `TIME_ZONE` | `UTC` | Rails time zone, e.g. `Europe/Berlin`, `Asia/Karachi`. |
| `WEB_CONCURRENCY` | `1` | Puma workers. Raise for busier instances. |
| `BACKGROUND_PROCESSING_CONCURRENCY` | `3` | Sidekiq threads. Raise temporarily for large imports. |
| `SMTP_SERVER`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD` | unset | Outbound email (password resets etc). |
| `OTP_ENCRYPTION_PRIMARY_KEY`, `OTP_ENCRYPTION_DETERMINISTIC_KEY`, `OTP_ENCRYPTION_KEY_DERIVATION_SALT` | unset | Required only if you enable two-factor auth. |
| `STORE_GEODATA` | `true` | Store reverse-geocoding data. |

### 7. Custom domain

Attach the domain to the Dawarich service in Railway (Settings, Networking), then **append it to `APPLICATION_HOSTS`** (comma-separated, no protocol). Rails rejects unknown Host headers, so skipping the second step gets you blocked requests.

### 8. Upgrading Dawarich

The template tracks `freikin/dawarich:latest`. Redeploying the Dawarich service pulls the newest release and runs its migrations on boot. Check the [changelog](https://github.com/Freika/dawarich/blob/master/CHANGELOG.md) before big jumps; upstream occasionally ships required manual steps.

### 9. Scaling up later

Switch file storage to any S3-compatible bucket: set `STORAGE_BACKEND=s3` plus `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_BUCKET`, and `AWS_ENDPOINT_URL` for non-AWS backends (a Railway bucket works). Once files are off local disk you can split Sidekiq into its own service: same image and variables, start command `sidekiq-entrypoint.sh sidekiq`, no volume.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Every deploy fails with "service unavailable" healthcheck errors while app logs look healthy | Target port not set, or Rails force-SSL redirecting the prober | Set the domain's target port to **3000** explicitly; keep `APPLICATION_PROTOCOL=http` (TLS still terminates at Railway's edge) |
| App crashes at boot with a Gemfile / `.ruby-version` error | Start command changed and foreman is running from the wrong directory | Keep `-d $APP_PATH` in the start command |
| Redis service fails instantly with no logs | Image tag cannot be pulled (e.g. any `bitnami/redis` tag) | Use official `redis:8.2.1` with the start command from `template.json` |
| Postgres fails on first boot with an initdb "directory not empty" error | Volume root contains `lost+found` | Keep `PGDATA=/var/lib/postgresql/data/pgdata` (subdirectory) |
| Blocked requests / 403 after adding a custom domain | Host not in the allowlist | Append the domain to `APPLICATION_HOSTS` |
| First deploy stuck then fails after 10 minutes | First-boot migrations exceeded the healthcheck window on a slow start | Healthcheck timeout is set to 600s; retry the deploy, the second boot is much faster |

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `postgis/postgis:17-3.5-alpine` | Database |
| Dawarich | `freikin/dawarich:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | dawarich |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Dawarich | 3000 |
| `RAILS_ENV` | Dawarich | production |
| `TIME_ZONE` | Dawarich | UTC |
| `SELF_HOSTED` | Dawarich | true |
| `DATABASE_PORT` | Dawarich | 5432 |
| `STORE_GEODATA` | Dawarich | true |
| `SECRET_KEY_BASE` | Dawarich | (secret) |
| `WEB_CONCURRENCY` | Dawarich | 1 |
| `DATABASE_PASSWORD` | Dawarich | (secret) |
| `DATABASE_USERNAME` | Dawarich | (secret) |
| `RAILS_LOG_TO_STDOUT` | Dawarich | true |
| `APPLICATION_PROTOCOL` | Dawarich | http |
| `BACKGROUND_PROCESSING_CONCURRENCY` | Dawarich | 3 |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `web-entrypoint.sh sh -c "echo 'web: bundle exec rails server -p 3000 -b ::' > /tmp/Procfile.railway; echo 'worker: bundle exec sidekiq' >> /tmp/Procfile.railway; exec bundle exec foreman start -f /tmp/Procfile.railway -d $APP_PATH"`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/app/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/dawarich-1)
