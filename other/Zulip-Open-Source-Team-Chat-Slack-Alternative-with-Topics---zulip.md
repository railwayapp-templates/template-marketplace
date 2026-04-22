# Deploy Zulip | Open Source Team Chat, Slack Alternative with Topics on Railway

Self-host Zulip. Async chat for distributed teams with 120+ integrations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zulip)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zulip?referralCode=QXdhdr)

Deploy Zulip on Railway to get a production-ready, self-hosted team chat server with topic-based threading that keeps conversations organized at scale. Self-host Zulip with full control over your data, no per-user fees, and the same powerful features used by open-source communities and distributed teams worldwide.

![Zulip Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776787582/da00755b-ab8b-4d61-91dc-e6c702a789fc.png)

Zulip is an open-source (Apache 2.0) team communication platform that uniquely combines the immediacy of real-time chat with the organization of threaded discussions. Unlike Slack or Microsoft Teams where conversations flow chronologically in channels, every Zulip message belongs to a named topic within a channel — making it possible to follow, catch up on, or mute individual conversations without losing context.

**Key features of Zulip:**
- **Topic-based threading** — every message has a topic, so parallel conversations stay organized
- **120+ native integrations** — GitHub, Jira, Sentry, PagerDuty, Jenkins, and more via webhooks
- **Full-text search** — powered by custom PostgreSQL with pgroonga extensions
- **Rich API** — incoming/outgoing webhooks, bot framework, REST API, Slack-compatible webhook format
- **Mobile and desktop apps** — native clients for iOS, Android, Windows, macOS, Linux
- **60+ languages supported** — full internationalization

The architecture uses PostgreSQL for persistent data, Redis for caching, Memcached for Django session/cache storage with SASL auth, and RabbitMQ for background task queuing (email delivery, push notifications, webhook dispatch).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| PostgreSQL | `zulip/zulip-postgresql:14` | Database |
| Zulip | `ghcr.io/zulip/zulip-server:11.6-1` | Web service |
| Memcached | `memcached:alpine` | Database |
| RabbitMQ | `rabbitmq:4.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | PostgreSQL | zulip | Default database name |
| `POSTGRES_USER` | PostgreSQL | (secret) | Database superuser name |
| `POSTGRES_PASSWORD` | PostgreSQL | (secret) | Database password |
| `DISABLE_HTTPS` | Zulip | True | Disable internal HTTPS (Railway handles TLS) |
| `SETTING_CACHES` | Zulip | - | Django cache backend config |
| `LOADBALANCER_IPS` | Zulip | 100.64.0.0/10 | Railway CGNAT proxy range |
| `SECRETS_secret_key` | Zulip | (secret) | Django SECRET_KEY |
| `SETTING_EMAIL_HOST` | Zulip | - | SMTP host |
| `SETTING_EMAIL_PORT` | Zulip | - | SMTP port (587 for TLS) |
| `SETTING_REDIS_HOST` | Zulip | - | Redis internal host |
| `SETTING_EMAIL_USE_TLS` | Zulip | True | Use TLS for SMTP |
| `SETTING_EXTERNAL_HOST` | Zulip | - | Public hostname |
| `SETTING_RABBITMQ_HOST` | Zulip | - | RabbitMQ internal host |
| `SECRETS_email_password` | Zulip | (secret) | SMTP password |
| `SECRETS_redis_password` | Zulip | (secret) | Redis auth password |
| `SETTING_EMAIL_HOST_USER` | Zulip | (secret) | SMTP username |
| `SECRETS_postgres_password` | Zulip | (secret) | PostgreSQL password |
| `SECRETS_rabbitmq_password` | Zulip | (secret) | RabbitMQ password |
| `SETTING_RABBITMQ_PASSWORD` | Zulip | (secret) | RabbitMQ password |
| `SETTING_RABBITMQ_USERNAME` | Zulip | (secret) | RabbitMQ username |
| `SECRETS_memcached_password` | Zulip | (secret) | Memcached SASL password |
| `SETTING_MEMCACHED_LOCATION` | Zulip | - | Memcached endpoint |
| `SETTING_OPEN_REALM_CREATION` | Zulip | True | Allow self-serve realm creation at /new/ |
| `SETTING_ZULIP_ADMINISTRATOR` | Zulip | - | Admin email |
| `SETTING_REMOTE_POSTGRES_HOST` | Zulip | - | PostgreSQL internal host |
| `SETTING_REMOTE_POSTGRES_PORT` | Zulip | 5432 | PostgreSQL port |
| `SETTING_NOREPLY_EMAIL_ADDRESS` | Zulip | - | Sender email |
| `SETTING_REMOTE_POSTGRES_SSLMODE` | Zulip | disable | No SSL for internal traffic |
| `SETTING_ADD_TOKENS_TO_NOREPLY_ADDRESS` | Zulip | (secret) | Anti-spoofing token on sender |
| `SASL_CONF_PATH` | Memcached | /tmp/memcached.conf | SASL config file path |
| `MEMCACHED_PASSWORD` | Memcached | (secret) | SASL authentication password |
| `MEMCACHED_SASL_PWDB` | Memcached | /tmp/memcached-sasl-db | SASL password database path |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Default broker password |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | Default broker username |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'echo "mech_list: plain" > "$SASL_CONF_PATH" && echo "zulip@zulip:$MEMCACHED_PASSWORD" > "$MEMCACHED_SASL_PWDB" && echo "zulip@localhost:$MEMCACHED_PASSWORD" >> "$MEMCACHED_SASL_PWDB" && exec memcached -S'`
- **Volume:** `/var/lib/rabbitmq`

**Category:** Other

[View on Railway →](https://railway.com/deploy/zulip)
