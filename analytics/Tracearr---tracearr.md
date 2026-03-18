# Deploy Tracearr on Railway

Real-time analytics and intelligent detection for Plex, Jellyfin, and Emby.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tracearr)

## About

Tracearr is the modern monitoring platform for Plex, Jellyfin, and Emby. It gives media server owners real-time analytics, an interactive stream map with geolocation, and intelligent detection rules to catch account sharing — all from a single unified dashboard. Free, open source, and self-hosted.

![Tracearr dashboard showing real-time streams, world map locations, and server resource monitoring for Plex, Jellyfin, and Emby](https://tracearr.com/images/dashboard-hero.png)

This Railway template deploys Tracearr as a turnkey, one-click setup — no manual configuration required. Everything is pre-wired and ready to go. Once deployed, open the web UI, connect your Plex, Jellyfin, or Emby servers, and you'll immediately start seeing real-time session data, stream locations on the world map, and activity analytics. Set up detection rules to automatically flag suspicious behavior like impossible travel or simultaneous streaming from different cities, and get notified instantly via webhooks. The template handles all infrastructure so you can focus on managing your media servers.

![Tracearr activity monitoring dashboard](https://tracearr.com/images/screenshots/Stats%20-%20Activity.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Timescale | `timescale/timescaledb-ha:pg18.1-ts2.25.0` | Database |
| Redis | `redis:8` | Database |
| Tracearr | `ghcr.io/connorgallopo/tracearr:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Timescale | tracearr | - |
| `POSTGRES_USER` | Timescale | (secret) | - |
| `POSTGRES_PASSWORD` | Timescale | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `TZ` | Tracearr | - | Timezone: Area/Location or UTC |
| `HOST` | Tracearr | 0.0.0.0 | Listen Address |
| `PORT` | Tracearr | 3000 | Listen Port |
| `NODE_ENV` | Tracearr | production | Node Environment |
| `LOG_LEVEL` | Tracearr | info | Log level: info, warn, error, debug |
| `REDIS_URL` | Tracearr | - | Redis URL |
| `CLAIM_CODE` | Tracearr | - | Code to prevent unauthorized access to the setup wizard |
| `JWT_SECRET` | Tracearr | (secret) | JWT Token Secret |
| `CORS_ORIGIN` | Tracearr | * | CORS Origin |
| `DATABASE_URL` | Tracearr | - | Database URL |
| `COOKIE_SECRET` | Tracearr | (secret) | Cookie Secret |
| `DNS_CACHE_MAX_TTL` | Tracearr | 86400 | DNS cache maximum TTL |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; unset PGHOST; rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && docker-entrypoint.sh postgres -p 5432 -c timescaledb.max_tuples_decompressed_per_dml_transaction=0 -c max_locks_per_transaction=4096 -c timescaledb.telemetry_level=off"`
- **Volume:** `/pgdata`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH --appendonly yes"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Verified:** Yes

[View on Railway →](https://railway.com/deploy/tracearr)
