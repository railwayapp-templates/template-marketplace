# Deploy Misskey — Self-Hosted Fediverse Social Server on Railway

Self-host Misskey — decentralized microblogging on the Fediverse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/misskey-fediverse-server)

## About

Misskey is an open-source, decentralized microblogging platform on the Fediverse — a feature-rich alternative to Mastodon and Twitter/X where you run your own instance, own your data, and federate with the wider ActivityPub network. Reactions, custom emoji, a rich timeline, Pages, Play (mini-apps), and Drive file storage give it a more playful, customizable feel than most Fediverse servers. This template deploys the full three-service stack — Misskey, PostgreSQL, and Redis — wired for Railway.

---

Misskey is a Node.js application with two hard requirements on Railway that determine whether a deployment works — both handled here.

**Redis is mandatory, not an optimization.** Misskey uses Redis for its background job queue (federation delivery, notifications, timeline fan-out) and caching. It won't run without a working Redis connection, which is why this is a three-service stack, not two. Both Postgres and Redis are provisioned and wired over the private network.

**Misskey configures from a YAML file, which Railway can't mount directly.** Normally Misskey reads its settings from `/misskey/.config/default.yml` — a file with the database, Redis, and URL configuration. Railway doesn't mount config files into containers, so this template generates `default.yml` at startup from Railway environment variables (database host, Redis host, instance URL, and credentials), bridging Misskey's file-based config to Railway's variable-based model. That translation is the piece a naive Misskey deployment on Railway gets stuck on.

**The instance URL is effectively permanent.** Misskey bakes the `url` into its federation identity — it's how other servers address your instance. Changing it after federation begins breaks those relationships, so set it to your final Railway domain (or a custom domain) before the first boot and leave it fixed.

First boot runs database migrations and takes a few minutes. Budget 2 GB RAM; federation and media processing are the main load drivers.

Typical cost: **~$10–15/month** on Railway across the three services. Misskey is free and open source; you pay only for infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Misskey | `ghcr.io/mkizka/misskey-railway` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MISSKEY__ID` | Misskey | aidx | - |
| `MISSKEY__DB__PORT` | Misskey | 5432 | - |
| `MISSKEY__DB__USER` | Misskey | (secret) | - |
| `MISSKEY__REDIS__PORT` | Misskey | 6379 | - |
| `MISSKEY__REDIS__USERNAME` | Misskey | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/misskey/files`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/misskey-fediverse-server)
