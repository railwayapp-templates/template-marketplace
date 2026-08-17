# Deploy Maybe on Railway

Monarch Money alternative. Self-hosted personal finance app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/maybe-finance)

## About

Maybe is an open-source personal finance app that pulls every account you own — checking, savings, credit cards, loans, brokerage, crypto, property and vehicles — into one net worth picture, with transactions and budgets on top. Built as a commercial product by Maybe Finance and released under AGPLv3, it sits closer to Monarch Money or Copilot Money than to a spreadsheet: balance charts, per-account activity feeds, a household two people can share, and a ledger you can filter, bulk-edit and categorize with rules. Self-host Maybe when you want that without giving a subscription service a view of your bank accounts.

Deploy Maybe the way its production Compose file runs it, split across four Railway services. A Rails web service serves the UI and API and holds the public domain; a Sidekiq worker runs the background queue and the jobs Maybe schedules at boot; managed PostgreSQL stores every account, entry and setting; managed Redis backs the Sidekiq queues and the shared Rails cache. Uploads go to a Railway object storage bucket rather than a disk, so web and worker read the same objects. Only the web service is reachable from the internet.

![Maybe Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786897233/15c49845-bac6-4b4a-919b-585200df4620.png)

Maybe is a Rails 7.2 application with a Hotwire front end, published as one image at `ghcr.io/maybe-finance/maybe`. That image runs both roles — Puma and Sidekiq — selected by the start command. Durable state lives in PostgreSQL; Redis carries the queue, cron and cache; object storage carries uploads.

Key capabilities:

- Net worth across cash, investments, crypto, property, vehicles, credit cards and loans
- A transaction ledger with categories, merchants, tags, bulk edits and rules
- Budgets with per-category targets and month-over-month comparison
- Multi-currency support and configurable date and number formats
- A household model with invited members, so a couple shares one instance
- CSV import for accounts and transactions, plus full data export
- An optional AI assistant over your own data, with your OpenAI key

Two things to know before committing. Maybe Finance archived the repository in July 2025 at **v0.6.0**, its final release: the app is complete and the image still runs, but expect no further updates or security patches, so keep signup invite-only. And live security prices and exchange rates came from Synth, a Maybe Finance service that shut down with the company — manual balances, transactions and budgets work without it, live pricing does not.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| maybe | `ghcr.io/maybe-finance/maybe:latest` | Web service |
| Redis | `redis:8.2` | Database |
| worker | `ghcr.io/maybe-finance/maybe:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | maybe | 3000 | Puma listening port |
| `DB_HOST` | maybe | - | Postgres private hostname |
| `DB_PORT` | maybe | - | Postgres port |
| `REDIS_URL` | maybe | - | Sidekiq queue and cron storage |
| `S3_BUCKET` | maybe | - | Bucket name |
| `S3_REGION` | maybe | - | Bucket region |
| `APP_DOMAIN` | maybe | - | Host used in links and email |
| `POSTGRES_DB` | maybe | - | Application database name |
| `SELF_HOSTED` | maybe | true | Enables self-hosted mode and registration |
| `POSTGRES_USER` | maybe | (secret) | Postgres username |
| `CACHE_REDIS_URL` | maybe | - | Rails cache on separate Redis db |
| `SECRET_KEY_BASE` | maybe | (secret) | Rails session and encryption key seed |
| `S3_ACCESS_KEY_ID` | maybe | - | Bucket access key |
| `POSTGRES_PASSWORD` | maybe | (secret) | Postgres password |
| `RAILS_MAX_THREADS` | maybe | 5 | Puma threads and database pool size |
| `AWS_ENDPOINT_URL_S3` | maybe | - | S3-compatible endpoint URL |
| `S3_SECRET_ACCESS_KEY` | maybe | (secret) | Bucket secret key |
| `SIDEKIQ_WEB_PASSWORD` | maybe | (secret) | Basic auth password for /sidekiq |
| `SIDEKIQ_WEB_USERNAME` | maybe | (secret) | Basic auth user for /sidekiq |
| `ACTIVE_STORAGE_SERVICE` | maybe | amazon | Use S3-compatible object storage |
| `REQUIRE_EMAIL_CONFIRMATION` | maybe | false | Set true after configuring SMTP |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `DB_HOST` | worker | - | Postgres private hostname |
| `DB_PORT` | worker | - | Postgres port |
| `REDIS_URL` | worker | - | Sidekiq queue and cron storage |
| `S3_BUCKET` | worker | - | Bucket name |
| `S3_REGION` | worker | - | Bucket region |
| `APP_DOMAIN` | worker | - | Host used in generated links |
| `POSTGRES_DB` | worker | - | Application database name |
| `SELF_HOSTED` | worker | true | Enables self-hosted mode |
| `POSTGRES_USER` | worker | (secret) | Postgres username |
| `CACHE_REDIS_URL` | worker | - | Rails cache on separate Redis db |
| `SECRET_KEY_BASE` | worker | (secret) | Must match the web service |
| `S3_ACCESS_KEY_ID` | worker | - | Bucket access key |
| `POSTGRES_PASSWORD` | worker | (secret) | Postgres password |
| `RAILS_MAX_THREADS` | worker | 5 | Sidekiq concurrency and database pool |
| `AWS_ENDPOINT_URL_S3` | worker | - | S3-compatible endpoint URL |
| `S3_SECRET_ACCESS_KEY` | worker | (secret) | Bucket secret key |
| `ACTIVE_STORAGE_SERVICE` | worker | amazon | Use S3-compatible object storage |
| `REQUIRE_EMAIL_CONFIRMATION` | worker | false | Matches the web service setting |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/rails/bin/docker-entrypoint bundle exec sidekiq`

**Category:** Other

[View on Railway →](https://railway.com/deploy/maybe-finance)
