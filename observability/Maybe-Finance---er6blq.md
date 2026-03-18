# Deploy Maybe Finance on Railway

The OS for your personal finances.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/er6blq)

## About

# Maybe Finance

Your open-source personal finance management application.

![Maybe dashboard_mockup](https://maybe.co/assets/screenshot-65d03882.png)
<sup><i>(Note: The image above is a mockup of what we're working towards. We're rapidly approaching the functionality shown, but not all of the parts are ready just yet.)</i></sup>

Website: https://maybe.co

Repository: https://github.com/maybe-finance/maybe


### Disclaimer

Maybe is distributed under an [AGPLv3 license](https://github.com/maybe-finance/maybe/blob/main/LICENSE). " Maybe" is a trademark of Maybe Finance, Inc.

_"Yashu Mittal" is not affiliated with Maybe Finance, Inc. in any way or form._

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Sidekiq | `ghcr.io/maybe-finance/maybe:latest` | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Maybe | `ghcr.io/maybe-finance/maybe:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SELF_HOSTED` | Sidekiq | true | - |
| `POSTGRES_USER` | Sidekiq | (secret) | - |
| `RAILS_FORCE_SSL` | Sidekiq | false | - |
| `SECRET_KEY_BASE` | Sidekiq | (secret) | - |
| `RAILS_ASSUME_SSL` | Sidekiq | false | - |
| `POSTGRES_PASSWORD` | Sidekiq | (secret) | - |
| `OPENAI_ACCESS_TOKEN` | Sidekiq | (secret) | NOTE: enabling OpenAI will incur costs when you use AI-related features in the app (chat, rules).  Make sure you have set appropriate spend limits on your account before adding this. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Maybe | 8080 | For users who have other applications listening at 3000, this allows them to set a value puma will listen to. |
| `APP_DOMAIN` | Maybe | - | This is the domain that your Maybe instance will be hosted at. It is used to generate links in emails and other places. |
| `SELF_HOSTED` | Maybe | true | - |
| `POSTGRES_USER` | Maybe | (secret) | - |
| `SYNTH_API_KEY` | Maybe | (secret) | This is used to convert between different currencies in the app. We use Synth, which is a Maybe product. You can sign up for a free account at synthfinance.com |
| `RAILS_FORCE_SSL` | Maybe | false | - |
| `SECRET_KEY_BASE` | Maybe | (secret) | - |
| `WEB_CONCURRENCY` | Maybe | 2 | - |
| `HOSTING_PLATFORM` | Maybe | railway | - |
| `RAILS_ASSUME_SSL` | Maybe | false | - |
| `POSTGRES_PASSWORD` | Maybe | (secret) | - |
| `OPENAI_ACCESS_TOKEN` | Maybe | (secret) | NOTE: enabling OpenAI will incur costs when you use AI-related features in the app (chat, rules).  Make sure you have set appropriate spend limits on your account before adding this. |
| `SELF_HOSTING_ENABLED` | Maybe | true | - |
| `GOOD_JOB_EXECUTION_MODE` | Maybe | async | - |

## Configuration

- **Start command:** `bundle exec sidekiq`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/template/er6blq)
