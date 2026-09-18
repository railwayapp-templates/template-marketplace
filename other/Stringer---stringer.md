# Deploy Stringer on Railway

Self-hosted RSS reader with no social feed or algorithm

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stringer)

## About

Stringer is a self-hosted, anti-social RSS reader: one account, the feeds you chose, nothing else. No recommendation engine, no social graph, no "stories you might like" — just a fast, keyboard-driven inbox for the open web. Self-host Stringer and your subscription list, read state and starred articles live in your own PostgreSQL database rather than somebody's analytics pipeline.

Deploy Stringer on Railway and you get the production shape rather than a single box. The `stringer` service runs the Rails application and is the only one with a public URL. `stringer-worker` fetches and parses feeds in the background, so a slow site never blocks a page load. `stringer-scheduler` runs the cron that refreshes every five minutes and prunes old read articles nightly. All three use a managed `Postgres` service holding every feed, story and preference. The admin account is created before the app accepts its first request, so the sign-up form is never open to a stranger who finds the URL first.

![Stringer web, worker and scheduler services around Railway Postgres](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789620258/stringer-architecture.webp)

Stringer is a Rails 8 application on PostgreSQL, Hotwire and GoodJob. It is deliberately small — an unread list, a reading pane, a starred archive, a feed manager — which is why it self-hosts well: no search cluster, no cache tier, no object storage.

- Feed discovery from a plain site URL, plus OPML import and export
- Keyboard-first reading with a shortcut overlay on `?`
- Starred articles kept indefinitely, read articles pruned on your schedule
- A Fever API clone at `/fever` for third-party mobile clients
- Interface translations for German, Spanish, French, Japanese, Dutch and more
- SSRF protection on every outbound fetch, including each redirect

The Railway deployment splits the roles Stringer's own image bundles into one container: `stringer` serves HTTP and owns migrations, `stringer-worker` fetches and parses, `stringer-scheduler` runs the polling and cleanup schedules.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stringer-worker | [gridalpha/stringer-railway](https://github.com/gridalpha/stringer-railway) | Worker |
| stringer | [gridalpha/stringer-railway](https://github.com/gridalpha/stringer-railway) | Web service |
| stringer-scheduler | [gridalpha/stringer-railway](https://github.com/gridalpha/stringer-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | stringer-worker | 8080 | Port for GoodJob's probe server |
| `DATABASE_URL` | stringer-worker | - | Postgres connection string |
| `SECRET_KEY_BASE` | stringer-worker | (secret) | Must match the web service |
| `GOOD_JOB_MAX_THREADS` | stringer-worker | 5 | Concurrent feed fetches |
| `ENCRYPTION_PRIMARY_KEY` | stringer-worker | - | Must match the web service |
| `ENCRYPTION_DETERMINISTIC_KEY` | stringer-worker | - | Must match the web service |
| `ENCRYPTION_KEY_DERIVATION_SALT` | stringer-worker | - | Must match the web service |
| `PORT` | stringer | 8080 | HTTP port Puma binds |
| `DB_POOL` | stringer | 15 | Active Record connection pool |
| `DATABASE_URL` | stringer | - | Postgres connection string |
| `SECRET_KEY_BASE` | stringer | (secret) | Rails session cookie signing key |
| `RAILS_MAX_THREADS` | stringer | 3 | Puma request threads |
| `STRINGER_PASSWORD` | stringer | (secret) | First admin password, seeded at boot |
| `STRINGER_USERNAME` | stringer | (secret) | First admin username, seeded at boot |
| `ENCRYPTION_PRIMARY_KEY` | stringer | - | Active Record encryption key |
| `GOOD_JOB_EXECUTION_MODE` | stringer | external | Hand jobs to the worker service |
| `ENCRYPTION_DETERMINISTIC_KEY` | stringer | - | Deterministic encryption key |
| `ENCRYPTION_KEY_DERIVATION_SALT` | stringer | - | Encryption key derivation salt |
| `PORT` | stringer-scheduler | 8080 | Port for GoodJob's probe server |
| `CLEANUP_CRON` | stringer-scheduler | 0 0 * * * | When old read articles are pruned |
| `DATABASE_URL` | stringer-scheduler | - | Postgres connection string |
| `GOOD_JOB_QUEUES` | stringer-scheduler | scheduler:1 | Unused queue, so it only schedules |
| `SECRET_KEY_BASE` | stringer-scheduler | (secret) | Must match the web service |
| `FETCH_FEEDS_CRON` | stringer-scheduler | */5 * * * * | How often every feed is polled |
| `CLEANUP_AFTER_DAYS` | stringer-scheduler | 30 | Age at which read, unstarred stories go |
| `GOOD_JOB_ENABLE_CRON` | stringer-scheduler | true | Run the scheduled jobs here only |
| `ENCRYPTION_PRIMARY_KEY` | stringer-scheduler | - | Must match the web service |
| `ENCRYPTION_DETERMINISTIC_KEY` | stringer-scheduler | - | Must match the web service |
| `ENCRYPTION_KEY_DERIVATION_SALT` | stringer-scheduler | - | Must match the web service |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |

## Configuration

- **Start command:** `/app/bin/railway/worker`
- **Healthcheck:** `/status/connected`
- **Start command:** `/app/bin/railway/web`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/app/bin/railway/scheduler`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Ruby, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/stringer)
