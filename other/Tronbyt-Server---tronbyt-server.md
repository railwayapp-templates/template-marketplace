# Deploy Tronbyt Server on Railway

Run 1000+ pixel apps on your LED display without a vendor cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tronbyt-server)

## About

Tronbyt Server is an open-source replacement for the cloud backend that drives Tidbyt smart LED displays. It runs the Pixlet applet runtime itself, renders each app into a small animated WebP, and serves those frames to your display over HTTP. Tidbyt's team was acquired by Modal and the hardware is no longer produced, so anyone with one of those 64x32 pixel panels is running against a cloud service with a finite life. Self-hosting Tronbyt Server cuts that dependency: your display keeps cycling apps whether or not the original servers come back.

Deploy Tronbyt Server on Railway and you get the full production layout rather than one container with a database file inside it. The app service runs the web UI, the Pixlet renderer and the device endpoint. PostgreSQL holds users, devices, installed apps and settings. Redis backs Pixlet's HTTP cache, so apps pulling weather, transit or stock data reuse responses across renders and restarts instead of hammering upstream APIs. A volume carries the community app catalogue, custom applet repositories, device firmware and rendered frames. Your display polls one public URL; everything else stays on Railway's private network.

![Diagram of the Tronbyt Server, Redis and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787131873/tronbyt-server-architecture.png)

Tronbyt Server replaces a vendor cloud with software you control. Apps are Starlark scripts running on Pixlet, the same runtime Tidbyt built, so the existing ecosystem of community applets works unchanged. The server runs them on a schedule, renders each to a 64x32 (or 128x64) WebP animation, and hands frames to the device from `/next`, with dwell time and brightness in response headers. Writing a new client is deliberately easy — anything that can fetch a URL and loop an animation can be a display.

Key capabilities:

- Web UI for adding devices, installing apps, reordering, pinning and disabling them
- Live render preview while configuring an app, plus a render-debug view for authoring
- Built-in firmware generator for ESP32 displays, with WiFi settings baked in
- Per-device brightness, cycle time, night mode and scheduling
- Custom app repositories per user, plus direct applet upload
- TV Mode for showing the rotation in a browser instead of on hardware
- Optional OIDC single sign-on, a documented HTTP API and Prometheus metrics

The three services divide cleanly. The app container does all rendering and is stateless apart from its volume. PostgreSQL stores relational state and the session-signing key, which is what lets logins survive a redeploy. Redis caches the outbound HTTP applets make — a dozen apps refreshing every five minutes otherwise means a dozen API calls every five minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| tronbyt-server | `ghcr.io/tronbyt/server:2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | tronbyt-server | 8000 | Health check target port |
| `DB_DSN` | tronbyt-server | - | Postgres connection string |
| `DATA_DIR` | tronbyt-server | /app/data | App repos, firmware, rendered frames |
| `LOG_LEVEL` | tronbyt-server | INFO | Logging verbosity |
| `REDIS_URL` | tronbyt-server | - | Applet HTTP response cache |
| `PRODUCTION` | tronbyt-server | true | Enables firmware sync and repo updates |
| `TRONBYT_PORT` | tronbyt-server | 8000 | Port the server listens on |
| `ENABLE_UPDATE_CHECKS` | tronbyt-server | true | Check for new releases at startup |
| `ENABLE_USER_REGISTRATION` | tronbyt-server | false | First signup still allowed, becomes admin |
| `SYSTEM_APPS_AUTO_REFRESH` | tronbyt-server | true | Pull app catalogue every 12 hours |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tronbyt-server)
