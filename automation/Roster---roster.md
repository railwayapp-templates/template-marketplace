# Deploy Roster on Railway

Team channels and threads, where the threads run agents on real repos.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/roster)

## About

Roster is team chat whose threads run coding agents on real repositories. A
channel is a repo; asking its agent something opens a thread and starts a real
session on real code, reached through Superset on whichever machine holds the
project. Progress, questions and output land in the thread, next to the
conversation that started it.

Roster runs as two tiers that ship in one image. The web service serves the
app and applies database migrations on boot. The worker owns every agent
session: it holds the connection to each machine, watches each running
session, writes progress back into the thread, and delivers steers and
cancellations. Setting `ROSTER_RUN_WORKER` to `1` runs both in the web
container, which is the simplest working setup; the worker can later be split
into its own service with the start command `node apps/worker/dist/worker.mjs`.

This template provisions four services: the app, Postgres for messages and
threads, Redis for the session work queue, and Centrifugo for realtime. The
app needs a volume mounted at `/app/uploads` so message attachments survive a
redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| centrifugo | `centrifugo/centrifugo:v6.9.6` | Web service |
| Redis | `redis:8.2` | Database |
| web | [harshithmullapudi/roster](https://github.com/harshithmullapudi/roster) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `CENTRIFUGO_HTTP_API_KEY` | centrifugo | (secret) |
| `CENTRIFUGO_CLIENT_TOKEN_HMAC_SECRET_KEY` | centrifugo | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `RESEND_API_KEY` | web | (secret) |
| `BETTER_AUTH_SECRET` | web | (secret) |
| `CENTRIFUGO_API_KEY` | web | (secret) |
| `SUPERSET_KEY_SECRET` | web | (secret) |
| `CENTRIFUGO_TOKEN_HMAC_SECRET` | web | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, CSS, Python, Rust, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/roster)
