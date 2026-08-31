# Deploy Mastodon on Railway

Social network server that connects to the wider fediverse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastodon-server)

## About

Mastodon is an open-source social network server that speaks ActivityPub, the protocol behind Threads, Pixelfed and PeerTube. Running your own instance means you own the moderation rules and the data, while members still follow and are followed by anyone on any other fediverse server. Communities, newsrooms and companies self-host it so their timeline is not somebody else's product.

Deploy Mastodon on Railway and you get the full production layout, not a single container: a Puma web service, a Node streaming service for live timelines, a Sidekiq worker tier, a dedicated scheduler, PostgreSQL, Redis, an object storage bucket, a signing gateway that serves that bucket publicly, and a Mailpit inbox so signup mail works immediately. To self-host Mastodon well you need all of that wired together, and this template does it for you.

![Mastodon web, streaming and Sidekiq services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788041768/mastodon-architecture.png)

Each instance holds its own accounts and posts and exchanges signed ActivityPub messages with every server its members follow, so a small instance still reaches the whole network. Teams self-host to set their own moderation policy, keep member data in their own infrastructure, or run a members-only community that still federates.

Key features:

- Chronological home, local and federated timelines with no ranking algorithm
- 500-character posts, polls, content warnings, alt text and quote posts
- Moderation tooling: reports, appeals, account approvals, domain blocks
- A documented REST and streaming API dozens of mobile clients speak
- Web Push notifications, two-factor auth and single sign-on hooks

How the services fit together: **web** runs Puma and serves the interface, the API and inbound federation. **streaming** is a Node process pushing live timeline updates over WebSockets from its own domain. **sidekiq** runs the background queues — federation, thumbnails, e-mail — and scales to more replicas; **sidekiq-scheduler** runs the cron-shaped queue alone and stays at one replica. **Postgres** holds accounts and posts, **Redis** backs the cache, queues and pub/sub, and the **bucket** holds every avatar, header and attachment plus cached remote media. **media** is a signing gateway making those files publicly readable without exposing the bucket, and **mailpit** captures outgoing mail until you connect a real relay.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sidekiq-scheduler | [gridalpha/mastodon-railway](https://github.com/gridalpha/mastodon-railway) (root: mastodon) | Worker |
| sidekiq | [gridalpha/mastodon-railway](https://github.com/gridalpha/mastodon-railway) (root: mastodon) | Worker |
| Redis | `redis:8.2` | Database |
| streaming | `ghcr.io/mastodon/mastodon-streaming:v4.7.0` | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |
| web | [gridalpha/mastodon-railway](https://github.com/gridalpha/mastodon-railway) (root: mastodon) | Web service |
| media | [gridalpha/mastodon-railway](https://github.com/gridalpha/mastodon-railway) (root: media-gateway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sidekiq-scheduler | 9394 | Metrics port used as health check |
| `DB_HOST` | sidekiq-scheduler | - | Private Postgres hostname |
| `DB_NAME` | sidekiq-scheduler | - | Postgres database name |
| `DB_PASS` | sidekiq-scheduler | - | Postgres password |
| `DB_PORT` | sidekiq-scheduler | 5432 | Postgres port |
| `DB_USER` | sidekiq-scheduler | (secret) | Postgres user |
| `REDIS_URL` | sidekiq-scheduler | - | Cache, queues and pub/sub |
| `S3_BUCKET` | sidekiq-scheduler | - | Media bucket name |
| `S3_REGION` | sidekiq-scheduler | - | Bucket region |
| `SMTP_PORT` | sidekiq-scheduler | 1025 | Outgoing mail port |
| `S3_ENABLED` | sidekiq-scheduler | true | Store uploads in object storage |
| `SMTP_LOGIN` | sidekiq-scheduler | (secret) | SMTP username |
| `S3_ENDPOINT` | sidekiq-scheduler | - | Bucket API endpoint |
| `SMTP_SERVER` | sidekiq-scheduler | - | Outgoing mail host |
| `LOCAL_DOMAIN` | sidekiq-scheduler | - | Federation identity, shared with web |
| `MASTODON_ROLE` | sidekiq-scheduler | sidekiq-scheduler | Runs the scheduler queue only, one replica |
| `S3_ALIAS_HOST` | sidekiq-scheduler | - | Public hostname in media URLs |
| `S3_PERMISSION` | sidekiq-scheduler | private | No public ACL on uploads |
| `SMTP_PASSWORD` | sidekiq-scheduler | (secret) | SMTP password |
| `RAILS_LOG_LEVEL` | sidekiq-scheduler | info | Application log level |
| `SECRET_KEY_BASE` | sidekiq-scheduler | (secret) | Must match the web service |
| `SMTP_AUTH_METHOD` | sidekiq-scheduler | plain | Plain SMTP authentication |
| `TRUSTED_PROXY_IP` | sidekiq-scheduler | 100.64.0.0/10,152.233.0.0/17,fd00::/8 | Real client IP behind the edge |
| `AWS_ACCESS_KEY_ID` | sidekiq-scheduler | - | Bucket access key |
| `SMTP_FROM_ADDRESS` | sidekiq-scheduler | - | From address on outgoing mail |
| `SIDEKIQ_CONCURRENCY` | sidekiq-scheduler | 5 | Threads for scheduled jobs |
| `SMTP_ENABLE_STARTTLS` | sidekiq-scheduler | never | Private listener offers no STARTTLS |
| `AWS_SECRET_ACCESS_KEY` | sidekiq-scheduler | (secret) | Bucket secret key |
| `STREAMING_API_BASE_URL` | sidekiq-scheduler | - | WebSocket origin for clients |
| `S3_FORCE_SINGLE_REQUEST` | sidekiq-scheduler | true | Simpler object download path |
| `SMTP_ENABLE_STARTTLS_AUTO` | sidekiq-scheduler | false | Do not probe for STARTTLS |
| `MASTODON_PROMETHEUS_EXPORTER_HOST` | sidekiq-scheduler | 0.0.0.0 | Metrics bind address |
| `MASTODON_PROMETHEUS_EXPORTER_PORT` | sidekiq-scheduler | 9394 | Metrics listening port |
| `MASTODON_PROMETHEUS_EXPORTER_LOCAL` | sidekiq-scheduler | true | Serve metrics in-process |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | sidekiq-scheduler | - | Must match the web service |
| `MASTODON_PROMETHEUS_EXPORTER_ENABLED` | sidekiq-scheduler | true | Expose worker metrics |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | sidekiq-scheduler | - | Must match the web service |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | sidekiq-scheduler | - | Must match the web service |
| `PORT` | sidekiq | 9394 | Metrics port used as health check |
| `DB_HOST` | sidekiq | - | Private Postgres hostname |
| `DB_NAME` | sidekiq | - | Postgres database name |
| `DB_PASS` | sidekiq | - | Postgres password |
| `DB_PORT` | sidekiq | 5432 | Postgres port |
| `DB_USER` | sidekiq | (secret) | Postgres user |
| `REDIS_URL` | sidekiq | - | Cache, queues and pub/sub |
| `S3_BUCKET` | sidekiq | - | Media bucket name |
| `S3_REGION` | sidekiq | - | Bucket region |
| `SMTP_PORT` | sidekiq | 1025 | Outgoing mail port |
| `S3_ENABLED` | sidekiq | true | Store uploads in object storage |
| `SMTP_LOGIN` | sidekiq | (secret) | SMTP username |
| `S3_ENDPOINT` | sidekiq | - | Bucket API endpoint |
| `SMTP_SERVER` | sidekiq | - | Outgoing mail host |
| `LOCAL_DOMAIN` | sidekiq | - | Federation identity, shared with web |
| `MASTODON_ROLE` | sidekiq | sidekiq | Runs every queue except scheduler |
| `S3_ALIAS_HOST` | sidekiq | - | Public hostname in media URLs |
| `S3_PERMISSION` | sidekiq | private | No public ACL on uploads |
| `SMTP_PASSWORD` | sidekiq | (secret) | SMTP password |
| `RAILS_LOG_LEVEL` | sidekiq | info | Application log level |
| `SECRET_KEY_BASE` | sidekiq | (secret) | Must match the web service |
| `SMTP_AUTH_METHOD` | sidekiq | plain | Plain SMTP authentication |
| `TRUSTED_PROXY_IP` | sidekiq | 100.64.0.0/10,152.233.0.0/17,fd00::/8 | Real client IP behind the edge |
| `AWS_ACCESS_KEY_ID` | sidekiq | - | Bucket access key |
| `SMTP_FROM_ADDRESS` | sidekiq | - | From address on outgoing mail |
| `SIDEKIQ_CONCURRENCY` | sidekiq | 10 | Threads per worker process |
| `SMTP_ENABLE_STARTTLS` | sidekiq | never | Private listener offers no STARTTLS |
| `AWS_SECRET_ACCESS_KEY` | sidekiq | (secret) | Bucket secret key |
| `STREAMING_API_BASE_URL` | sidekiq | - | WebSocket origin for clients |
| `S3_FORCE_SINGLE_REQUEST` | sidekiq | true | Simpler object download path |
| `SMTP_ENABLE_STARTTLS_AUTO` | sidekiq | false | Do not probe for STARTTLS |
| `MASTODON_PROMETHEUS_EXPORTER_HOST` | sidekiq | 0.0.0.0 | Metrics bind address |
| `MASTODON_PROMETHEUS_EXPORTER_PORT` | sidekiq | 9394 | Metrics listening port |
| `MASTODON_PROMETHEUS_EXPORTER_LOCAL` | sidekiq | true | Serve metrics in-process |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | sidekiq | - | Must match the web service |
| `MASTODON_PROMETHEUS_EXPORTER_ENABLED` | sidekiq | true | Expose worker metrics |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | sidekiq | - | Must match the web service |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | sidekiq | - | Must match the web service |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `BIND` | streaming | 0.0.0.0 | Listen on all interfaces |
| `PORT` | streaming | 4000 | HTTP port Railway probes |
| `DB_HOST` | streaming | - | Private Postgres hostname |
| `DB_NAME` | streaming | - | Postgres database name |
| `DB_PASS` | streaming | - | Postgres password |
| `DB_POOL` | streaming | 10 | Postgres connection pool size |
| `DB_PORT` | streaming | 5432 | Postgres port |
| `DB_USER` | streaming | (secret) | Postgres user |
| `NODE_ENV` | streaming | production | Node environment |
| `REDIS_URL` | streaming | - | Streaming pub/sub channel |
| `LOCAL_DOMAIN` | streaming | - | Federation identity, shared with web |
| `TRUSTED_PROXY_IP` | streaming | 100.64.0.0/10,152.233.0.0/17,fd00::/8 | Real client IP behind the edge |
| `PORT` | mailpit | 8025 | Web inbox port Railway probes |
| `MP_UI_AUTH` | mailpit | - | Basic auth on the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | Credentials required to send |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web inbox bind address |
| `MAILPIT_PASSWORD` | mailpit | (secret) | Shared inbox and SMTP password |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP bind address |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow auth on the plain listener |
| `PORT` | web | 3000 | HTTP port Railway probes |
| `DB_HOST` | web | - | Private Postgres hostname |
| `DB_NAME` | web | - | Postgres database name |
| `DB_PASS` | web | - | Postgres password |
| `DB_PORT` | web | 5432 | Postgres port |
| `DB_USER` | web | (secret) | Postgres user |
| `REDIS_URL` | web | - | Cache, queues and pub/sub |
| `S3_BUCKET` | web | - | Media bucket name |
| `S3_REGION` | web | - | Bucket region |
| `SMTP_PORT` | web | 1025 | Outgoing mail port |
| `S3_ENABLED` | web | true | Store uploads in object storage |
| `SMTP_LOGIN` | web | (secret) | SMTP username |
| `MAX_THREADS` | web | 5 | Puma threads per worker |
| `S3_ENDPOINT` | web | - | Bucket API endpoint |
| `SMTP_SERVER` | web | - | Outgoing mail host |
| `LOCAL_DOMAIN` | web | - | Permanent federation identity |
| `MASTODON_ROLE` | web | web | Selects the Puma web role |
| `S3_ALIAS_HOST` | web | - | Public hostname in media URLs |
| `S3_PERMISSION` | web | private | No public ACL on uploads |
| `SMTP_PASSWORD` | web | (secret) | SMTP password |
| `RAILS_LOG_LEVEL` | web | info | Application log level |
| `SECRET_KEY_BASE` | web | (secret) | Rails session signing key |
| `WEB_CONCURRENCY` | web | 2 | Puma worker processes |
| `SMTP_AUTH_METHOD` | web | plain | Plain SMTP authentication |
| `TRUSTED_PROXY_IP` | web | 100.64.0.0/10,152.233.0.0/17,fd00::/8 | Real client IP behind the edge |
| `AWS_ACCESS_KEY_ID` | web | - | Bucket access key |
| `SMTP_FROM_ADDRESS` | web | - | From address on outgoing mail |
| `SMTP_ENABLE_STARTTLS` | web | never | Private listener offers no STARTTLS |
| `AWS_SECRET_ACCESS_KEY` | web | (secret) | Bucket secret key |
| `STREAMING_API_BASE_URL` | web | - | WebSocket origin for clients |
| `MASTODON_ADMIN_PASSWORD` | web | (secret) | Owner account password, change after first login |
| `MASTODON_ADMIN_USERNAME` | web | (secret) | Owner account username |
| `S3_FORCE_SINGLE_REQUEST` | web | true | Simpler object download path |
| `SMTP_ENABLE_STARTTLS_AUTO` | web | false | Do not probe for STARTTLS |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | web | - | At-rest encryption key |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | web | - | Deterministic encryption key |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | web | - | Encryption key derivation salt |
| `PORT` | media | 3000 | HTTP port Railway probes |
| `S3_BUCKET` | media | - | Media bucket name |
| `S3_REGION` | media | - | Bucket region |
| `S3_ENDPOINT` | media | - | Bucket API endpoint |
| `PUBLIC_PREFIXES` | media | media_attachments/,accounts/,custom_emojis/,preview_cards/,site_uploads/,cache/ | Key prefixes served publicly |
| `S3_ACCESS_KEY_ID` | media | - | Bucket access key |
| `S3_SECRET_ACCESS_KEY` | media | (secret) | Bucket secret key |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/metrics`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/streaming/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/livez`
- **Healthcheck:** `/health`
- **Healthcheck:** `/healthz`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** JavaScript, Ruby, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mastodon-server)
