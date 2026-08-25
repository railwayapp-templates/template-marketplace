# Deploy Discourse on Railway

Open source discussion forum for online communities

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discourse-forum)

## About

Discourse is the open-source discussion platform behind thousands of product forums and developer communities, including the official ones for Rust, Docker and Ubuntu. It is built for long-form conversation: infinite-scroll topics, trust levels that hand moderation powers to reliable members, a staff flag queue, full-text search, real-time chat, and email replies that post back into a thread. Self-host Discourse when you want a community you own outright.

Deploying Discourse normally means a Rails stack behind nginx with a background job runner, PostgreSQL and Redis. This template wires that up. The **discourse** service runs nginx in front of unicorn workers with Sidekiq inside the unicorn master, so web requests and background jobs share one container and one uploads volume. **Postgres** stores every topic, post and user. **Redis** backs the cache, the Sidekiq queues and the MessageBus channel that makes replies appear without a refresh. **Mailpit** captures outgoing mail privately, so signups and resets work immediately.

![Diagram of the Discourse, Postgres, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787366044/discourse-architecture.png)

Discourse is a Rails application that expects PostgreSQL, Redis and an SMTP relay, plus storage for uploads and backups. Teams self-host it to keep member data in their own infrastructure and avoid per-seat pricing. Key features:

- Topic-centric discussion with infinite scroll, summaries and bookmarks
- Trust levels that promote reliable members automatically
- A staff review queue fed by user flags, spam heuristics and moderation rules
- Mailing-list mode: reply by email, and every notification threads correctly
- Real-time chat, categories, tags, groups and per-category permissions
- Themes, bundled plugins, a REST API, webhooks and SSO

The **discourse** service is the only one with a public domain: nginx serves assets and uploaded files directly and proxies the rest to unicorn. Sidekiq runs in that same container because Discourse's background jobs — image optimisation, thumbnails, backups — write to the uploads directory the web tier serves, so they share a filesystem. That directory is a volume at `/shared`, alongside backups and logs, and survives every redeploy. **Postgres** and **Redis** stay private; **Mailpit** publishes only its inbox UI, behind basic auth.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| discourse | [gridalpha/discourse-railway](https://github.com/gridalpha/discourse-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | mailpit | UTC | Timestamp timezone |
| `PORT` | mailpit | 8025 | Inbox UI port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox UI |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Inbox UI listener |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener, private network only |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | discourse | 80 | nginx listening port |
| `ADMIN_EMAIL` | discourse | admin@example.com | First administrator email, change this |
| `ADMIN_PASSWORD` | discourse | (secret) | First administrator password |
| `ADMIN_USERNAME` | discourse | (secret) | First administrator username |
| `UNICORN_WORKERS` | discourse | 3 | Web worker processes |
| `UNICORN_SIDEKIQS` | discourse | 1 | Background job processes |
| `DISCOURSE_DB_HOST` | discourse | - | Private Postgres hostname |
| `DISCOURSE_DB_NAME` | discourse | - | Database holding all content |
| `DISCOURSE_DB_PORT` | discourse | - | Postgres port |
| `DISCOURSE_HOSTNAME` | discourse | - | Hostname in every generated link |
| `DISCOURSE_SMTP_PORT` | discourse | 1025 | Mailpit SMTP listener |
| `RAILS_LOG_TO_STDOUT` | discourse | 1 | Send Rails logs to the deployment log |
| `DISCOURSE_REDIS_HOST` | discourse | - | Private Redis hostname |
| `DISCOURSE_REDIS_PORT` | discourse | - | Redis port |
| `DISCOURSE_DB_PASSWORD` | discourse | (secret) | Postgres password |
| `DISCOURSE_DB_USERNAME` | discourse | (secret) | Postgres role |
| `DISCOURSE_FORCE_HTTPS` | discourse | true | Emit https links and secure cookies |
| `DISCOURSE_SMTP_DOMAIN` | discourse | - | HELO domain for outbound mail |
| `DISCOURSE_SMTP_ADDRESS` | discourse | - | Outbound mail host |
| `DISCOURSE_REDIS_PASSWORD` | discourse | (secret) | Redis auth password |
| `DISCOURSE_SMTP_FORCE_TLS` | discourse | false | No implicit TLS on port 1025 |
| `DISCOURSE_SECRET_KEY_BASE` | discourse | (secret) | Session and token signing key |
| `DISCOURSE_DEVELOPER_EMAILS` | discourse | - | Developer-level access list |
| `DISCOURSE_SMTP_ENABLE_START_TLS` | discourse | false | Mailpit advertises no STARTTLS |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/srv/status`
- **Volume:** `/shared`

**Category:** CMS · **Languages:** Shell, Ruby, Dockerfile

[View on Railway →](https://railway.com/deploy/discourse-forum)
