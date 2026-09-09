# Deploy Diaspora on Railway

Federated social network where every server is its own community

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/diaspora)

## About

Deploy diaspora*, the federated social network running since 2010, and you get a "pod": a server you own, whose members post, share photos and follow people on every other pod in the network. It behaves more like Facebook than Twitter: posts are long-form, photos are first-class, and every contact lands in an "aspect" that decides who sees what you write. A pod with three members is not an island: its users follow anyone on any other diaspora* server. Communities, families and privacy-minded groups self-host it so the moderation policy and the data are theirs.

Self-host diaspora* on Railway and the template wires up the whole production shape, not one container. `diaspora` runs the Puma web tier behind your public domain. `sidekiq` runs the workers as a separate service — photo processing, federation delivery, mail and seven recurring jobs — so heavy work never blocks a page load. `Postgres` stores every post, profile and relationship, `Redis` carries the job queue, a managed bucket holds every uploaded image, and `media` is a signed read gateway serving those images to browsers and remote pods. `mailpit` captures outgoing mail, so password resets work immediately.

![Diagram of the diaspora, sidekiq, media, mailpit, Redis and Postgres services](https://res.cloudinary.com/rroe4rtk/image/upload/v1788867313/diaspora-architecture.png)

diaspora* is an AGPL-licensed Rails application that speaks its own federation protocol to every other pod. Teams self-host it for a social space with a known moderation policy and no advertising, analytics or algorithmic feed — and for the option to leave, since accounts export and move between pods.

Key features:

- Aspects: per-contact audience lists, so one account is personal and professional at once
- Long-form posts with Markdown, hashtags, mentions, polls and photo galleries
- Federation with other pods, plus a gateway to Friendica and Hubzilla
- Account export and import, including photo archives
- A moderation panel, two-factor auth and per-post visibility

The architecture splits the app the way upstream's own `Procfile` does. `diaspora` serves HTTP; `sidekiq` consumes the same Redis queue and runs every job the web tier enqueues. Neither has a disk, because uploads live in the shared bucket — which is what lets the tiers scale independently. `media` exists because that bucket serves no anonymous reads: it accepts only `GET` and `HEAD` under the image prefix, signs each request and streams the object back, keeping account exports private.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| diaspora | [gridalpha/diaspora-railway](https://github.com/gridalpha/diaspora-railway) | Web service |
| media | [gridalpha/diaspora-railway](https://github.com/gridalpha/diaspora-railway) | Web service |
| sidekiq | [gridalpha/diaspora-railway](https://github.com/gridalpha/diaspora-railway) | Worker |
| mailpit | `axllent/mailpit:latest` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | diaspora | 3000 | HTTP port Puma binds |
| `REDIS_URL` | diaspora | - | Sidekiq queue connection |
| `ADMIN_EMAIL` | diaspora | - | First account's email address |
| `MAIL_ENABLE` | diaspora | true | Turn on outgoing mail |
| `MAIL_METHOD` | diaspora | smtp | Deliver over SMTP |
| `S3_ENDPOINT` | diaspora | - | S3-compatible endpoint URL |
| `SECRET_TOKEN` | diaspora | (secret) | Signs sessions and Devise tokens |
| `DIASPORA_ROLE` | diaspora | web | Selects the Puma web role |
| `S3_ASSET_HOST` | diaspora | - | Public image URL prefix |
| `ADMIN_PASSWORD` | diaspora | (secret) | First account's password |
| `ADMIN_USERNAME` | diaspora | (secret) | First account, created at boot |
| `MAIL_SMTP_HOST` | diaspora | - | SMTP server hostname |
| `MAIL_SMTP_PORT` | diaspora | 1025 | SMTP server port |
| `SETTINGS_POD_NAME` | diaspora | diaspora* | Name the pod introduces itself by |
| `ENVIRONMENT_S3_KEY` | diaspora | - | Bucket access key |
| `MAIL_SENDER_ADDRESS` | diaspora | - | From address on outgoing mail |
| `ENVIRONMENT_S3_BUCKET` | diaspora | - | Bucket name |
| `ENVIRONMENT_S3_ENABLE` | diaspora | true | Store uploads in object storage |
| `ENVIRONMENT_S3_REGION` | diaspora | - | Bucket region |
| `ENVIRONMENT_S3_SECRET` | diaspora | (secret) | Bucket secret key |
| `MAIL_SMTP_AUTHENTICATION` | diaspora | none | No SMTP auth on the private listener |
| `SETTINGS_ENABLE_REGISTRATIONS` | diaspora | true | Open registration, captcha protected |
| `PORT` | media | 3000 | HTTP port the gateway binds |
| `S3_BUCKET` | media | - | Bucket name |
| `S3_REGION` | media | - | Bucket region |
| `S3_ENDPOINT` | media | - | S3-compatible endpoint URL |
| `S3_ACCESS_KEY_ID` | media | - | Bucket access key |
| `S3_SECRET_ACCESS_KEY` | media | (secret) | Bucket secret key |
| `PORT` | sidekiq | 3000 | Port the health probe listens on |
| `REDIS_URL` | sidekiq | - | Sidekiq queue connection |
| `ADMIN_EMAIL` | sidekiq | - | Podmin contact address |
| `MAIL_ENABLE` | sidekiq | true | Turn on outgoing mail |
| `MAIL_METHOD` | sidekiq | smtp | Deliver over SMTP |
| `S3_ENDPOINT` | sidekiq | - | S3-compatible endpoint URL |
| `SECRET_TOKEN` | sidekiq | (secret) | Same signing key as the web tier |
| `DIASPORA_ROLE` | sidekiq | sidekiq | Selects the background worker role |
| `S3_ASSET_HOST` | sidekiq | - | Public image URL prefix |
| `ADMIN_PASSWORD` | sidekiq | (secret) | Podmin password |
| `ADMIN_USERNAME` | sidekiq | (secret) | Podmin account name |
| `MAIL_SMTP_HOST` | sidekiq | - | SMTP server hostname |
| `MAIL_SMTP_PORT` | sidekiq | 1025 | SMTP server port |
| `ENVIRONMENT_URL` | sidekiq | - | Pod URL, no domain of its own |
| `SETTINGS_POD_NAME` | sidekiq | - | Pod name in outgoing mail |
| `ENVIRONMENT_S3_KEY` | sidekiq | - | Bucket access key |
| `MAIL_SENDER_ADDRESS` | sidekiq | - | From address on outgoing mail |
| `ENVIRONMENT_S3_BUCKET` | sidekiq | - | Bucket name |
| `ENVIRONMENT_S3_ENABLE` | sidekiq | true | Store uploads in object storage |
| `ENVIRONMENT_S3_REGION` | sidekiq | - | Bucket region |
| `ENVIRONMENT_S3_SECRET` | sidekiq | (secret) | Bucket secret key |
| `MAIL_SMTP_AUTHENTICATION` | sidekiq | none | No SMTP auth on the private listener |
| `SETTINGS_ENABLE_REGISTRATIONS` | sidekiq | - | Registration switch |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web inbox listener |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener, private network |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/livez`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Other · **Languages:** Ruby, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/diaspora)
