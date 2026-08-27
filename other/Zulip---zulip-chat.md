# Deploy Zulip on Railway

Team chat where every conversation gets its own named topic

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zulip-chat)

## About

Zulip is an open-source team chat application built around a threading model no other chat tool copies well: every message belongs to a named *topic* inside a channel, so a busy channel reads like a set of short email threads rather than one scrolling firehose. Open-source projects, research groups and distributed engineering teams pick it over Slack for that reason — someone who was asleep for eight hours can skim topic names and read only the conversations that concern them. It ships web, desktop and mobile clients, a REST API, 100+ integrations, and history no retention paywall truncates.

Self-host Zulip on Railway and this template gives you the whole production topology, not a single container that quietly drops half of Zulip's features. The `zulip` service runs the Django application, the Tornado event server, the queue worker and nginx under one supervisor tree, with a volume at `/data` for uploads and secrets. Behind it sit `postgres` (Zulip's own PostgreSQL build, carrying the `pgroonga` extension its search depends on), `rabbitmq` for event queues, `memcached` for the object cache, managed `Redis` for rate limiting and presence, and `mailpit` to capture outgoing mail. Only the app and the Mailpit inbox get public URLs.

![Diagram of the Zulip service topology on Railway with its five backing services](https://res.cloudinary.com/rroe4rtk/image/upload/v1787724497/zulip-architecture.png)

Channels hold topics, topics hold messages, and every view — inbox, recent conversations, combined feed — is built on that hierarchy. Teams self-host Zulip when they want history on infrastructure they control, when per-seat pricing stops making sense, or when compliance keeps conversations out of a SaaS.

- Topic-based threading in every channel, with per-topic mute, resolve and follow
- Unlimited searchable history, with operators for sender, channel, topic and attachments
- 100+ integrations, incoming and outgoing webhooks, interactive bots and a REST API
- LaTeX, syntax-highlighted code, polls and to-do lists in messages
- Email, LDAP, SAML, OpenID Connect and social authentication backends
- Importers for Slack, Mattermost, Rocket.Chat and Teams exports

PostgreSQL stores messages, users and the full-text index. RabbitMQ carries internal event queues — outgoing email, notifications, link previews, thumbnails — so slow work never blocks a request. memcached caches rendered messages and user objects, Redis backs rate limiting and presence, and Mailpit stands in for an SMTP relay so nothing is half-configured on day one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| memcached | `memcached:alpine` | Database |
| Redis | `redis:8.2` | Database |
| postgres | `zulip/zulip-postgresql:14` | Database |
| rabbitmq | `rabbitmq:4.2-management` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| zulip | [gridalpha/zulip-railway](https://github.com/gridalpha/zulip-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SASL_CONF_PATH` | memcached | /home/memcache/memcached.conf | SASL mechanism config path |
| `MEMCACHED_PASSWORD` | memcached | (secret) | SASL password for zulip@localhost |
| `MEMCACHED_SASL_PWDB` | memcached | /home/memcache/memcached-sasl-db | SASL password database path |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | postgres | zulip | Database created on first boot |
| `POSTGRES_USER` | postgres | (secret) | Role created on first boot |
| `POSTGRES_PASSWORD` | postgres | (secret) | Role password, read by the server |
| `POSTGRES_INITDB_ARGS` | postgres | --data-checksums | initdb flags on first boot |
| `PORT` | rabbitmq | 15672 | Management port used for health checks |
| `RABBITMQ_NODENAME` | rabbitmq | rabbit@localhost | Pinned so the data directory survives redeploys |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq | - | Broker password |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | Broker user created on first boot |
| `RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS` | rabbitmq | +S 4:4 +SDio 4 | Erlang scheduler counts |
| `PORT` | mailpit | 8025 | Inbox UI port |
| `MP_UI_AUTH` | mailpit | - | Inbox basic-auth credentials |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the inbox UI |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for the SMTP listener |
| `PORT` | zulip | 80 | Port Railway probes and routes to |
| `ZULIP_ORG_NAME` | zulip | Zulip | Organization display name |
| `LOADBALANCER_IPS` | zulip | 100.64.0.0/10,152.233.0.0/17 | Trusted reverse proxy ranges |
| `ZULIP_ADMIN_NAME` | zulip | Zulip Admin | Organization owner full name |
| `ZULIP_ADMIN_EMAIL` | zulip | you@example.com | Organization owner login |
| `SECRETS_secret_key` | zulip | (secret) | Django signing key |
| `SETTING_EMAIL_HOST` | zulip | - | Outgoing SMTP host |
| `SETTING_EMAIL_PORT` | zulip | 1025 | Outgoing SMTP port |
| `SETTING_REDIS_HOST` | zulip | - | Private Redis hostname |
| `SETTING_REDIS_PORT` | zulip | 6379 | Redis port |
| `AUTO_BACKUP_ENABLED` | zulip | False | Nightly pg_dump into the volume |
| `ZULIP_AUTH_BACKENDS` | zulip | EmailAuthBackend | Enabled authentication backends |
| `ZULIP_ADMIN_PASSWORD` | zulip | (secret) | Organization owner password |
| `SETTING_EMAIL_USE_SSL` | zulip | False | Implicit TLS on the SMTP connection |
| `SETTING_EMAIL_USE_TLS` | zulip | False | STARTTLS on the SMTP connection |
| `SETTING_EXTERNAL_HOST` | zulip | - | Hostname Zulip serves |
| `SETTING_RABBITMQ_HOST` | zulip | - | Private RabbitMQ hostname |
| `SECRETS_redis_password` | zulip | (secret) | Redis password |
| `ZULIP_SEED_ORGANIZATION` | zulip | True | Set False to skip first-boot organization creation |
| `SECRETS_postgres_password` | zulip | (secret) | PostgreSQL password |
| `SECRETS_rabbitmq_password` | zulip | (secret) | RabbitMQ password |
| `SECRETS_memcached_password` | zulip | (secret) | memcached SASL password |
| `SETTING_MEMCACHED_LOCATION` | zulip | - | Private memcached address |
| `SETTING_ZULIP_ADMINISTRATOR` | zulip | - | Server administrator address |
| `SETTING_REMOTE_POSTGRES_HOST` | zulip | - | Private PostgreSQL hostname |
| `SETTING_REMOTE_POSTGRES_PORT` | zulip | 5432 | PostgreSQL port |
| `CONFIG_application_server__uwsgi_processes` | zulip | 4 | Web worker processes |
| `CONFIG_application_server__queue_workers_multiprocess` | zulip | false | One combined queue worker |

## Configuration

- **Start command:** `/bin/sh -euc 'echo "mech_list: plain" > "$SASL_CONF_PATH"; printf "zulip@localhost:%s\nzulip@%s:%s\n" "$MEMCACHED_PASSWORD" "$(hostname)" "$MEMCACHED_PASSWORD" > "$MEMCACHED_SASL_PWDB"; exec memcached -S -m 512 -c 4096'`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh postgres -c shared_buffers=512MB -c effective_cache_size=1536MB -c work_mem=8MB -c maintenance_work_mem=128MB`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -euc 'mkdir -p /etc/rabbitmq/conf.d; MEM=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$MEM" in max|"") MEM=2147483648;; esac; { echo "default_user = $RABBITMQ_DEFAULT_USER"; echo "default_pass = $RABBITMQ_DEFAULT_PASS"; echo "total_memory_available_override_value = $MEM"; echo "consumer_timeout = 86400000"; } > /etc/rabbitmq/conf.d/10-railway.conf; exec docker-entrypoint.sh rabbitmq-server'`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/rabbitmq`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/zulip-chat)
