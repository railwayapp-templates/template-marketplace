# Deploy Sure on Railway

Personal finance app for net worth, budgets and transactions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sure-finance)

## About

Sure is an open-source personal finance app for tracking net worth, accounts, transactions and budgets in one place — the maintained community fork of Maybe Finance, whose team open-sourced roughly a million dollars of work before shutting down. Household finances are about as sensitive as data gets: a budgeting service sees every salary, balance and purchase. Self-host Sure and that stays on infrastructure you control, with the dashboards and net worth tracking commercial tools charge for.

This template runs Sure the way its maintainers run it in production. The `sure` service is the Rails web app serving the UI and API. The `worker` service is a separate Sidekiq process handling account syncs, market-data refreshes and scheduled jobs, so a long import never blocks a page load. `Postgres` holds every account, transaction and setting, `Redis` backs the job queues and the Rails cache, and an object storage bucket holds photos and attachments — which is what lets web and worker share files. Deploy Sure on Railway and all five pieces are wired over private networking before the first page load.

![Sure web and worker services above Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788412440/sure-architecture.png)

Sure models a household's whole financial picture: depository accounts, credit cards, loans, investments, crypto, property and vehicles, each with its own balance history. It computes net worth over time, categorises spending, and builds budgets and reports from transactions you import or type in. Self-host it when a spreadsheet is no longer enough but you want neither a subscription nor a third party reading your bank data.

Key features:

- Net worth across every asset and liability type, with historical charts
- Transactions with categories, rules, merchants, transfers and CSV import
- Budgets and reports, including cashflow and income-versus-expense views
- Multi-currency support with free exchange rate and security price data
- Family accounts, so each household member gets their own login
- Passkey and OpenID Connect sign-in, plus a REST API and an MCP endpoint
- An optional AI assistant that answers questions about your own data

The Railway architecture separates the parts that scale differently. The web service handles requests; the worker runs everything asynchronous — nightly syncs, rate refreshes, bulk categorisation — through Sidekiq, which keeps its queues and cron schedule in Redis. Postgres is the system of record, and the bucket exists because Railway volumes attach to one service while both processes need the same files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| worker | [gridalpha/sure-railway](https://github.com/gridalpha/sure-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| sure | [gridalpha/sure-railway](https://github.com/gridalpha/sure-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `DB_HOST` | worker | - | Private Postgres hostname |
| `DB_PORT` | worker | - | Postgres port |
| `REDIS_URL` | worker | - | Sidekiq queues and cron schedule |
| `APP_DOMAIN` | worker | - | Public host for generated links |
| `POSTGRES_DB` | worker | - | Database name |
| `SELF_HOSTED` | worker | true | Enables the self-hosting feature set |
| `POSTGRES_USER` | worker | (secret) | Database role |
| `SECRET_KEY_BASE` | worker | (secret) | Must match the web service |
| `ONBOARDING_STATE` | worker | - | Kept in step with the web service |
| `GENERIC_S3_BUCKET` | worker | - | Bucket name |
| `GENERIC_S3_REGION` | worker | - | Bucket region |
| `POSTGRES_PASSWORD` | worker | (secret) | Database password |
| `RAILS_MAX_THREADS` | worker | 5 | Sidekiq concurrency and database pool size |
| `GENERIC_S3_ENDPOINT` | worker | - | S3-compatible endpoint |
| `SECURITIES_PROVIDER` | worker | yahoo_finance | Free security prices, no API key |
| `ACTIVE_STORAGE_SERVICE` | worker | generic_s3 | Store uploads in object storage |
| `EXCHANGE_RATE_PROVIDER` | worker | yahoo_finance | Free rates, no API key needed |
| `GENERIC_S3_ACCESS_KEY_ID` | worker | - | Bucket access key |
| `REQUIRE_EMAIL_CONFIRMATION` | worker | false | Keep false until SMTP is configured |
| `GENERIC_S3_FORCE_PATH_STYLE` | worker | true | Required addressing style for this endpoint |
| `GENERIC_S3_SECRET_ACCESS_KEY` | worker | (secret) | Bucket secret key |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | worker | - | Must match the web service |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | worker | - | Must match the web service |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | worker | - | Must match the web service |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | sure | 3000 | Puma listening port |
| `DB_HOST` | sure | - | Private Postgres hostname |
| `DB_PORT` | sure | - | Postgres port |
| `REDIS_URL` | sure | - | Sidekiq queues and Rails cache |
| `APP_DOMAIN` | sure | - | Public host for links and WebAuthn |
| `POSTGRES_DB` | sure | - | Database name |
| `SELF_HOSTED` | sure | true | Enables the self-hosting feature set |
| `POSTGRES_USER` | sure | (secret) | Database role |
| `SECRET_KEY_BASE` | sure | (secret) | Rails session signing key, must stay stable |
| `ONBOARDING_STATE` | sure | open | open, closed or invite_only; close after registering |
| `GENERIC_S3_BUCKET` | sure | - | Bucket name |
| `GENERIC_S3_REGION` | sure | - | Bucket region |
| `POSTGRES_PASSWORD` | sure | (secret) | Database password |
| `RAILS_MAX_THREADS` | sure | 5 | Puma threads and database pool size |
| `GENERIC_S3_ENDPOINT` | sure | - | S3-compatible endpoint |
| `SECURITIES_PROVIDER` | sure | yahoo_finance | Free security prices, no API key |
| `SIDEKIQ_WEB_PASSWORD` | sure | (secret) | Optional basic auth password for /sidekiq |
| `SIDEKIQ_WEB_USERNAME` | sure | (secret) | Optional basic auth user for /sidekiq |
| `ACTIVE_STORAGE_SERVICE` | sure | generic_s3 | Store uploads in object storage |
| `EXCHANGE_RATE_PROVIDER` | sure | yahoo_finance | Free rates, no API key needed |
| `GENERIC_S3_ACCESS_KEY_ID` | sure | - | Bucket access key |
| `REQUIRE_EMAIL_CONFIRMATION` | sure | false | Keep false until SMTP is configured |
| `GENERIC_S3_FORCE_PATH_STYLE` | sure | true | Required addressing style for this endpoint |
| `GENERIC_S3_SECRET_ACCESS_KEY` | sure | (secret) | Bucket secret key |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | sure | - | At-rest encryption key |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | sure | - | Deterministic encryption key |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | sure | - | Encryption key salt |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/rails/bin/docker-entrypoint bundle exec sidekiq`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Ruby, Dockerfile

[View on Railway →](https://railway.com/deploy/sure-finance)
