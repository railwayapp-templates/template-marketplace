# Deploy Zulip — Self-Hosted Topic-Based Team Chat on Railway

Self-host Zulip — async team chat organized by topics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zulip-topic-team-chat)

## About

Zulip is the open-source team chat built around topics — a Slack alternative designed for asynchronous, distributed teams. Unlike Slack, Mattermost, or Teams, where messages flow in one chronological stream, every Zulip message lives under a named topic within a channel. You can follow, catch up on, or mute individual conversations without scrolling an entire channel — the reason remote teams across time zones prefer it. This template deploys Zulip's full five-service stack, correctly wired with matched secrets, so it works on the first deploy.

---

Zulip is the most capable self-hosted async chat, and its two defining traits — the topic model and the five-service stack — are worth understanding.

**Topics are the whole point — and why async teams choose it.** In Zulip, every message belongs to a named topic inside a channel, so a channel is a set of threaded conversations rather than one endless stream. Someone catching up hours later reads only the topics that matter and mutes the rest, instead of scrolling a firehose. For distributed teams spanning time zones, this changes how communication scales. If your team is co-located and wants a flat Slack-style feed, a simpler chat server fits better; if you're async, Zulip is purpose-built for you.

**Five services with matched secrets — the wiring that trips up manual setups.** Zulip runs as an app server plus PostgreSQL, Memcached, RabbitMQ, and Redis. The critical detail: each backend service's password must match the corresponding `SECRETS_*` value in the Zulip container — Postgres, RabbitMQ, Memcached, and Redis passwords are all paired, and a single mismatch breaks startup. This template generates and matches all of them, the exact step a hand-rolled deploy gets wrong.

**Set `SECRETS_secret_key` and keep it stable.** Zulip needs a 64-character Django secret key (`openssl rand -hex 32`) to sign sessions. This template generates it; keep it stable across redeploys, or active sessions are invalidated.

**`SETTING_EXTERNAL_HOST` must be your Railway domain, with `DISABLE_HTTPS=True`.** Zulip builds links against `SETTING_EXTERNAL_HOST`, so it must be your Railway domain. Set `DISABLE_HTTPS=True` because Railway terminates TLS at its edge — Zulip serves HTTP internally while Railway provides HTTPS.

**It's the heaviest chat option — size it right.** Five services and a 2 GB RAM minimum make Zulip more resource-hungry than simpler chat servers. Allocate accordingly and scale as your team grows.

Typical cost: **~$15–25/month** on Railway across the five services. Zulip is Apache-2.0 licensed and free — no per-user fees, ever.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgreSQL | `zulip/zulip-postgresql:14` | Database |
| Redis | `redis:8.2.1` | Database |
| Zulip | `ghcr.io/zulip/zulip-server` | Database |
| RabbitMQ | `rabbitmq:4.0` | Database |
| Memcached | `memcached:alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | PostgreSQL | zulip | - |
| `POSTGRES_USER` | PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | PostgreSQL | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `DISABLE_HTTPS` | Zulip | True | - |
| `LOADBALANCER_IPS` | Zulip | 100.64.0.0/10 | - |
| `SECRETS_secret_key` | Zulip | (secret) | - |
| `SETTING_EMAIL_HOST` | Zulip | - | SMTP host |
| `SETTING_EMAIL_PORT` | Zulip | - | SMTP port (587 for TLS) |
| `SETTING_EMAIL_USE_TLS` | Zulip | True | - |
| `SECRETS_email_password` | Zulip | (secret) | SMTP password |
| `SECRETS_redis_password` | Zulip | (secret) | - |
| `SETTING_EMAIL_HOST_USER` | Zulip | (secret) | SMTP username |
| `SECRETS_postgres_password` | Zulip | (secret) | - |
| `SECRETS_rabbitmq_password` | Zulip | (secret) | - |
| `SETTING_RABBITMQ_PASSWORD` | Zulip | (secret) | - |
| `SETTING_RABBITMQ_USERNAME` | Zulip | (secret) | - |
| `SECRETS_memcached_password` | Zulip | (secret) | - |
| `SETTING_OPEN_REALM_CREATION` | Zulip | True | - |
| `SETTING_ZULIP_ADMINISTRATOR` | Zulip | - | Admin email |
| `SETTING_REMOTE_POSTGRES_PORT` | Zulip | 5432 | - |
| `SETTING_NOREPLY_EMAIL_ADDRESS` | Zulip | - | Sender email |
| `SETTING_REMOTE_POSTGRES_SSLMODE` | Zulip | disable | - |
| `SETTING_ADD_TOKENS_TO_NOREPLY_ADDRESS` | Zulip | (secret) | - |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | - |
| `SASL_CONF_PATH` | Memcached | /tmp/memcached.conf | - |
| `MEMCACHED_PASSWORD` | Memcached | (secret) | - |
| `MEMCACHED_SASL_PWDB` | Memcached | /tmp/memcached-sasl-db | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/rabbitmq`

**Category:** Other

[View on Railway →](https://railway.com/deploy/zulip-topic-team-chat)
