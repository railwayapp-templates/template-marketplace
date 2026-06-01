# Deploy Tracearr — Plex, Jellyfin & Emby Analytics on Railway on Railway

Self-host Tracearr: stream analytics & account sharing detection. Free.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tracearr-media-analytics)

## About

![Tracearr dashboard showing real-time streams, world map, and media server analytics](https://tracearr.com/images/dashboard-hero.png)

Tracearr is a free, open-source monitoring platform for Plex, Jellyfin, and Emby — real-time
stream analytics, an interactive geolocation world map, automated trust scoring, and
intelligent account sharing detection that catches impossible travel and concurrent location
violations. Unlike Tautulli which is Plex-only, Tracearr monitors all three major self-hosted
media servers from a single unified dashboard.

This template deploys the full production stack: Tracearr, TimescaleDB for time-series
analytics data, and Redis — pre-wired on Railway with one-click setup.

---

Running Tracearr requires a time-series database, a Redis message queue for webhook event
processing, and a persistent HTTPS endpoint for receiving payloads from your media servers.
Without a managed host, you're configuring Docker Compose, inter-service networking, volumes,
and SSL manually. Railway provisions all three services automatically — connect your media
servers via webhook and stream data appears on the dashboard in real time.

Typical cost: **~$5–10/month** on Railway's Hobby plan. Tracearr is free and open-source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Timescale | `timescale/timescaledb-ha` | Database |
| Tracearr | `connorgallopo/tracearr` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Timescale | tracearr | - |
| `POSTGRES_USER` | Timescale | (secret) | - |
| `POSTGRES_PASSWORD` | Timescale | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Volume:** `/pgdata`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/tracearr-media-analytics)
