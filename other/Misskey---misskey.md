# Deploy Misskey on Railway

Decentralized microblogging server for running your own social site

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/misskey)

## About

Misskey is an open-source, decentralized microblogging server that speaks ActivityPub, so an instance you run yourself joins the same fediverse as Mastodon and Akkoma. It is the most feature-dense server in that network: custom emoji reactions instead of a single like button, MFM rich text with animated inline effects, a Drive that stores every upload as a reusable object, Antennas that build live keyword timelines, and Pages and Play for AiScript apps. Communities self-host Misskey for their own moderation rules, their own domain in every handle, and no ranking algorithm over the timeline.

Deploy Misskey on Railway and this template wires up the whole production shape: the Misskey server, a managed PostgreSQL database holding accounts, notes and follows, managed Redis driving the job queue, timelines, reactions and the streaming API, and Meilisearch answering full-text note search. A volume is mounted at the Drive path so uploaded avatars, banners and attachments survive every redeploy, and the app is published on an HTTPS domain behind a health check that passes only when PostgreSQL, Redis and Meilisearch all answer.

![Misskey service on Railway with Postgres, Meilisearch and Redis](https://res.cloudinary.com/rroe4rtk/image/upload/v1788365765/misskey-architecture.png)

Misskey is a full social platform, not a thin ActivityPub relay. The server is a TypeScript application on Fastify and NestJS: it renders its own web client, exposes a documented HTTP API and a WebSocket streaming API, and delivers federation traffic through a Redis-backed job queue. Self-hosting suits a community that wants its own namespace and keeps moderation and its social graph local.

Key features:

- Custom emoji reactions, quote renotes, polls and content warnings
- MFM rich text with animations, colours and inline maths
- Drive file manager with folders and reusable attachments
- Antennas, channels, clips, Pages and AiScript Play apps
- ActivityPub federation with per-instance moderation and blocks
- A control panel for users, roles, invites, emoji and jobs

How the services fit together: the **Misskey** service handles HTTP and WebSocket traffic in its cluster master while each cluster worker consumes the job queue, so federation delivery, inbox processing and timeline fan-out stay out of the request path. **PostgreSQL** is the system of record for users, notes, follows and drive metadata. **Redis** carries the job queue, cached timelines, reaction counts and the streaming pub/sub. **Meilisearch** indexes each note as it is posted.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| meilisearch | `getmeili/meilisearch:v1` | Database |
| Redis | `redis:8.2` | Database |
| misskey | [gridalpha/misskey-railway](https://github.com/gridalpha/misskey-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | meilisearch | 7700 | Health-check port |
| `TMPDIR` | meilisearch | /meili_data/tmp | Indexing scratch on the volume |
| `MEILI_ENV` | meilisearch | production | Requires the master key, disables dev UI |
| `MEILI_DB_PATH` | meilisearch | /meili_data/data.ms | Index location on the volume |
| `MEILI_DUMP_DIR` | meilisearch | /meili_data/dumps | Dumps on the volume |
| `MEILI_HTTP_ADDR` | meilisearch | [::]:7700 | Bind reachable from the private network |
| `MEILI_MASTER_KEY` | meilisearch | - | Root API key for search |
| `MEILI_UPGRADE_DB` | meilisearch | true | In-place upgrade on new v1 builds |
| `MEILI_NO_ANALYTICS` | meilisearch | true | No telemetry |
| `MEILI_SNAPSHOT_DIR` | meilisearch | /meili_data/snapshots | Snapshots on the volume |
| `MEILI_SCHEDULE_SNAPSHOT` | meilisearch | 86400 | One snapshot a day |
| `MEILI_MAX_INDEXING_MEMORY` | meilisearch | 1024 MiB | Cap indexing memory |
| `MEILI_MAX_INDEXING_THREADS` | meilisearch | 2 | Cap threads to the CPU quota |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | misskey | 3000 | HTTP listening port |
| `MEILI_KEY` | misskey | - | Meilisearch master key |
| `MEILI_HOST` | misskey | - | Meilisearch private hostname |
| `MEILI_PORT` | misskey | 7700 | Meilisearch port |
| `REDIS_HOST` | misskey | - | Redis private hostname |
| `REDIS_PORT` | misskey | - | Redis port |
| `REDIS_USER` | misskey | (secret) | Redis ACL username |
| `DATABASE_DB` | misskey | - | Database name |
| `MISSKEY_URL` | misskey | - | Permanent public origin, never change |
| `CLUSTER_LIMIT` | misskey | 2 | Job-queue worker processes |
| `DATABASE_HOST` | misskey | - | Postgres private hostname |
| `DATABASE_PORT` | misskey | - | Postgres port |
| `DATABASE_USER` | misskey | (secret) | Database user |
| `REDIS_PASSWORD` | misskey | (secret) | Redis password |
| `SETUP_PASSWORD` | misskey | (secret) | Gates first administrator creation |
| `DATABASE_PASSWORD` | misskey | (secret) | Database password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'mkdir -p /meili_data/tmp /meili_data/snapshots /meili_data/dumps; exec tini -s -- /bin/meilisearch'`
- **Healthcheck:** `/health`
- **Volume:** `/meili_data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/misskey/files`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/misskey)
