# Deploy Zulip team chat on Railway

Complete Zulip team chat with durable messaging, search, and uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zulip-team-chat)

## About

Run a private Zulip workspace with durable message history, threaded conversations, file uploads, background queues, and outbound email. Railway terminates TLS for the public Zulip service while PostgreSQL, RabbitMQ, Redis, and Memcached stay on private networking.

Zulip is an open-source team chat product organized around topics, which keeps long-running technical and operational conversations easier to follow than one continuous channel. This template deploys the official Zulip 12.1 container with its supported service dependencies and persistent storage paths.

The deployment is sized and documented for one application server serving a small team. It is not a high-availability topology, and the Zulip service should have access to at least 2 GB of memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RabbitMQ | `rabbitmq@sha256:83522278ca69414e4895b3ea3c0f943c63ad316c063f9cda9c32fd42fe800f47` | Database |
| PostgreSQL | `zulip/zulip-postgresql@sha256:e71ba8616fa42cdc1b248f51263d9290c29681cb8c1992eb9b498af0bb656b29` | Database |
| Redis | `redis@sha256:987c376c727652f99625c7d205a1cba3cb2c53b92b0b62aade2bd48ee1593232` | Database |
| Memcached | `memcached@sha256:c8503d4491edd3110cc07d0465089d3a41cf1daf8645e71149e39a51835e92cd` | Database |
| Zulip | `ghcr.io/zulip/zulip-server@sha256:1e9235b345ac86ff97168055d5c7e35e314dd9aa96e343be28583ab2b61b1bb0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RABBITMQ_NODENAME` | RabbitMQ | rabbit@localhost | Stable Erlang node identity that keeps RabbitMQ attached to its persisted queue database across redeploys. |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | - |
| `POSTGRES_DB` | PostgreSQL | zulip | - |
| `POSTGRES_USER` | PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | PostgreSQL | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `SASL_CONF_PATH` | Memcached | /home/memcache/memcached.conf | - |
| `MEMCACHED_PASSWORD` | Memcached | (secret) | - |
| `MEMCACHED_SASL_PWDB` | Memcached | /home/memcache/memcached-sasl-db | - |
| `CERTIFICATES` | Zulip | - | Leave empty because Railway terminates public TLS before forwarding traffic to Zulip. |
| `LOADBALANCER_IPS` | Zulip | 100.64.0.0/10 | - |
| `TRUST_GATEWAY_IP` | Zulip | True | - |
| `SECRETS_secret_key` | Zulip | (secret) | - |
| `SETTING_EMAIL_HOST` | Zulip | - | Hostname of the transactional SMTP server. |
| `SETTING_EMAIL_PORT` | Zulip | 587 | - |
| `AUTO_BACKUP_ENABLED` | Zulip | True | - |
| `SETTING_EMAIL_USE_TLS` | Zulip | True | - |
| `SECRETS_email_password` | Zulip | (secret) | Password or API token for the transactional SMTP account. |
| `SECRETS_redis_password` | Zulip | (secret) | - |
| `SETTING_EMAIL_HOST_USER` | Zulip | (secret) | Username for the transactional SMTP account. |
| `SECRETS_postgres_password` | Zulip | (secret) | - |
| `SECRETS_rabbitmq_password` | Zulip | (secret) | - |
| `SECRETS_memcached_password` | Zulip | (secret) | - |
| `SETTING_ZULIP_ADMINISTRATOR` | Zulip | - | Email address for the Zulip administrator and operational notifications. |
| `SETTING_REMOTE_POSTGRES_SSLMODE` | Zulip | disable | - |
| `CONFIG_application_server__queue_workers_multiprocess` | Zulip | False | - |

## Configuration

- **Volume:** `/var/lib/rabbitmq`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -euc 'exec redis-server --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -euc 'printf "mech_list: plain\n" > "$SASL_CONF_PATH"; printf "zulip@%s:%s\nzulip@localhost:%s\n" "$HOSTNAME" "$MEMCACHED_PASSWORD" "$MEMCACHED_PASSWORD" > "$MEMCACHED_SASL_PWDB"; exec memcached -S'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/zulip-team-chat)
