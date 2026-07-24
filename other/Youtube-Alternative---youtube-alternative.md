# Deploy Youtube Alternative on Railway

Video streaming  platform —  live, uploads, transcoding and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/youtube-alternative)

## About

PeerTube is an open-source, decentralized video hosting platform that lets you build your own YouTube-like service. It supports video uploads, live streaming, HLS transcoding, channels, playlists, user accounts, and optional federation through ActivityPub, giving creators, communities, and organizations complete ownership of their video platform and content.

![PeerTube](https://docs.joinpeertube.org/assets/landing-page.Rl3b_haN.jpg)

Hosting PeerTube on Railway provides a fully managed environment for running your own video platform without maintaining servers or networking infrastructure. This template deploys three Railway services: the PeerTube application, PostgreSQL for persistent data storage, and Redis for background jobs and queues. A Railway Volume stores uploaded videos, thumbnails, HLS assets, and configuration files, while Railway automatically provisions HTTPS and private networking between services. Live streaming is supported through a Railway TCP Proxy on port **1935**, allowing broadcasting software such as OBS to publish directly to your instance. As your library grows, Railway makes it easy to scale compute resources and storage while handling the underlying infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Peertube | `chocobozzz/peertube:production` | Web service |
| redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Peertube | 9000 | - |
| `NODE_CONFIG_DIR` | Peertube | /app/config:/app/support/docker/production/config:/data/config | - |
| `PEERTUBE_DB_SSL` | Peertube | false | - |
| `PEERTUBE_SECRET` | Peertube | (secret) | - |
| `PEERTUBE_DB_PORT` | Peertube | 5432 | - |
| `PEERTUBE_ADMIN_EMAIL` | Peertube | admin@example.com | - |
| `PEERTUBE_DB_PASSWORD` | Peertube | (secret) | - |
| `PEERTUBE_DB_USERNAME` | Peertube | (secret) | - |
| `PEERTUBE_LOCAL_CONFIG` | Peertube | /data/config | - |
| `PT_INITIAL_ROOT_PASSWORD` | Peertube | (secret) | - |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDIS_URL` | redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `REDIS_PUBLIC_URL` | redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379

**Category:** Other

[View on Railway →](https://railway.com/deploy/youtube-alternative)
