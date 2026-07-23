# Deploy PeerTube on Railway

Decentralized video platform — uploads, transcoding, live streaming.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/peertube)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/peertube?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=peertube)

[PeerTube](https://joinpeertube.org/) is the leading free and open source, decentralized video platform — your own YouTube: upload videos, transcode them to multiple resolutions with HLS, stream live via RTMP, build channels and playlists, and optionally federate with thousands of other PeerTube instances over ActivityPub.

This template runs PeerTube as three Railway services: the PeerTube server (Node.js, serving the web client, API, and HLS video from one container), PostgreSQL, and Redis for job queues. Videos, thumbnails, and admin-panel configuration persist on a single volume at `/data`. RTMP live-streaming ingest is exposed through a Railway TCP proxy on port 1935. The admin `root` account is created on first boot from the `PT_INITIAL_ROOT_PASSWORD` variable. Transcoding runs on CPU via the bundled ffmpeg.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| peertube | [nomideusz/peertube-railway](https://github.com/nomideusz/peertube-railway) | Web service |
| postgres | `postgres:17-alpine` | Database |
| redis | `redis:7-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | peertube | 9000 | Port for Railway healthcheck probing. Do not change. |
| `NODE_CONFIG_DIR` | peertube | /app/config:/app/support/docker/production/config:/data/config | Don't change. |
| `PEERTUBE_DB_SSL` | peertube | false | Don't change. |
| `PEERTUBE_SECRET` | peertube | (secret) | Server secret. Auto generated. |
| `PEERTUBE_DB_NAME` | peertube | - | Wired automatically. Don't change. |
| `PEERTUBE_DB_PORT` | peertube | 5432 | Don't change. |
| `PEERTUBE_ADMIN_EMAIL` | peertube | admin@example.com | Email for the root admin account — change to yours. |
| `PEERTUBE_DB_HOSTNAME` | peertube | - | Wired automatically to the postgres service. Don't change. |
| `PEERTUBE_DB_PASSWORD` | peertube | (secret) | Wired automatically. Don't change. |
| `PEERTUBE_DB_USERNAME` | peertube | (secret) | Wired automatically. Don't change. |
| `PEERTUBE_LOCAL_CONFIG` | peertube | /data/config | Don't change. |
| `PEERTUBE_REDIS_HOSTNAME` | peertube | - | Wired automatically to the redis service. Don't change. |
| `PT_INITIAL_ROOT_PASSWORD` | peertube | (secret) | Password for the root admin account. Auto generated. |
| `PEERTUBE_WEBSERVER_HOSTNAME` | peertube | - | Instance hostname — your federated identity. Wired automatically. |
| `POSTGRES_DB` | postgres | peertube | Don't change. |
| `POSTGRES_USER` | postgres | (secret) | Don't change. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Database password. Auto generated. |

## Configuration

- **Healthcheck:** `/api/v1/config`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `docker-entrypoint.sh redis-server --save '' --appendonly no`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/peertube)
