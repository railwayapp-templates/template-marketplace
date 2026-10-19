# Deploy Postiz Instagram on Railway

Schedule Instagram posts, Reels and Stories with Postiz

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-postiz-for-instagram-scheduling)

## About

This Railway template runs Postiz with Instagram publishing for feed posts, carousels, Reels, Stories, and comment replies. Self-host creators and teams get a full scheduler without per-channel fees.

Running Postiz Instagram on Railway means you keep your scheduled posts, media, comments and account tokens inside your own Postgres database and /uploads volume. Nothing gets handed to a third-party scheduler. You connect your own Meta app and add the Instagram channel.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2@sha256:47670742d7924adbcdb404d1288b6327815b23141969c0939b8e5d61f78c2634` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18@sha256:fcc6686a3f4f1962fe4ed77a15884553b7bd611ae1cea3204687968c5c09d517` | Database |
| Postiz | `ghcr.io/gitroomhq/postiz-app:v2.25.1@sha256:d2b37802e96757729fdea2d3d71287f841c2b619faa1cb4c21dac07df657fde1` | Web service |
| Temporal | `temporalio/auto-setup:1.28.1@sha256:607d68caa111338d754771efb876c92dfcdae06d056e4530bb31cd0f37406e6a` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private host of Redis. |
| `REDISPORT` | Redis | 6379 | Redis port. |
| `REDISUSER` | Redis | default | Redis user. |
| `REDIS_URL` | Redis | - | Private connection URL used by Postiz. |
| `REDISPASSWORD` | Redis | (secret) | Redis password. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated per deploy. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot (used by Postiz). |
| `DATABASE_URL` | Postgres | - | Private connection URL used by Postiz. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated per deploy. |
| `PORT` | Postiz | 3000 | Backend port (3000); the public domain targets nginx on 5000. |
| `MAIN_URL` | Postiz | - | Public HTTPS URL of Postiz (from the Railway domain). |
| `RUN_CRON` | Postiz | true | Run the background workflow that recovers missed posts. |
| `API_LIMIT` | Postiz | 30 | Public API requests allowed per hour. |
| `REDIS_URL` | Postiz | - | Redis connection from the Redis service. |
| `IS_GENERAL` | Postiz | true | Self-hosted mode (no SaaS billing screens). |
| `JWT_SECRET` | Postiz | (secret) | Secret that signs login sessions, generated per deploy. |
| `NOT_SECURED` | Postiz | true | Host-only login cookie; needed on *.up.railway.app, remove on own domain. |
| `DATABASE_URL` | Postiz | - | Postgres connection from the Postgres service. |
| `FRONTEND_URL` | Postiz | - | Public frontend URL; used for links, OAuth redirects and upload URLs. |
| `NX_ADD_PLUGINS` | Postiz | false | Nx build setting from the official compose; leave false. |
| `STORAGE_PROVIDER` | Postiz | local | Where uploads are stored (local volume). |
| `TEMPORAL_ADDRESS` | Postiz | - | Temporal server address on the private network. |
| `UPLOAD_DIRECTORY` | Postiz | /uploads | Upload folder on the volume. |
| `TEMPORAL_NAMESPACE` | Postiz | default | Temporal namespace Postiz uses. |
| `BACKEND_INTERNAL_URL` | Postiz | http://localhost:3000 | Backend address inside the container (frontend to backend). |
| `DISABLE_REGISTRATION` | Postiz | false | Set true to block new sign-ups after creating your account. |
| `NEXT_PUBLIC_BACKEND_URL` | Postiz | - | Public API URL the browser calls (same domain, /api via nginx). |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | Postiz | /uploads | Public path that serves uploads. |
| `DB` | Temporal | postgres12 | Temporal database driver (Postgres). |
| `DBNAME` | Temporal | temporal | Database for Temporal workflow state (created on first boot). |
| `DB_PORT` | Temporal | - | Postgres port from the Postgres service. |
| `ENABLE_ES` | Temporal | false | Use Elasticsearch for visibility; off, Postgres is used. |
| `BIND_ON_IP` | Temporal | :: | Listen on all interfaces, IPv4 and IPv6. |
| `POSTGRES_PWD` | Temporal | - | Postgres password from the Postgres service. |
| `POSTGRES_USER` | Temporal | (secret) | Postgres user from the Postgres service. |
| `POSTGRES_SEEDS` | Temporal | - | Postgres host from the Postgres service. |
| `TEMPORAL_ADDRESS` | Temporal | 127.0.0.1:7233 | Address the built-in setup CLI uses to reach the server. |
| `DEFAULT_NAMESPACE` | Temporal | default | Namespace registered on first boot. |
| `VISIBILITY_DBNAME` | Temporal | temporal_visibility | Database for Temporal workflow search (created on first boot). |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal | 127.0.0.1 | Address this single node advertises to itself. |
| `SKIP_ADD_CUSTOM_SEARCH_ATTRIBUTES` | Temporal | true | Skip demo search attributes so Postiz's own ones fit. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`

**Category:** Other

[View on Railway →](https://railway.com/deploy/deploy-postiz-for-instagram-scheduling)
