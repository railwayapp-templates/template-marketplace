# Deploy Redash on Railway

Query databases with SQL and turn results into shared dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redash-analytics)

## About

Redash is an open-source data platform that turns SQL into shared charts and dashboards. Point it at a database, write a query, pick a visualization, and pin the result to a dashboard that refreshes on a schedule. It ships connectors for more than sixty sources — PostgreSQL, MySQL, BigQuery, Snowflake, ClickHouse, Athena, Databricks, MongoDB, Elasticsearch, Trino and Google Sheets among them — so one instance can front a whole warehouse estate. Analysts get a schema browser and autocomplete; everyone else gets a URL. Redash has been in use since 2013 and is BSD-licensed.

Self-host Redash on Railway and you get the topology its own production compose file describes, already wired together. A gunicorn web service serves the UI and REST API behind a generated HTTPS domain. A scheduler enqueues periodic work, and three worker services drain separate RQ queues: ad-hoc queries, scheduled refreshes and schema scans, and maintenance such as alert evaluation and result cleanup. Managed PostgreSQL holds queries, dashboards, users and cached results; managed Redis is the job broker and rate-limit store. Everything but the web service stays private.

![Diagram of the Redash server, scheduler, worker and datastore services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787732085/redash-architecture.png)

Redash is deliberately narrow: it does not model your data and does not replace your warehouse. It gives SQL-literate people a fast loop — query, chart, share, schedule — and everyone else a link. That suits teams who know their schema and want reporting without a modelling project.


Key features:

- Query editor with schema browser, autocomplete, snippets and parameters
- Around twenty visualization types: charts, counters, pivot tables, cohorts, funnels, maps
- Dashboards built from any published visualization, with dashboard-level filters
- Scheduled refreshes plus alerts to email, Slack, Discord, Teams, PagerDuty, Datadog and webhooks
- A full REST API, so anything the UI does can be scripted
- Groups and per-data-source permissions, plus Google OAuth, SAML and LDAP

Splitting the queues across separate services matters in practice: a slow ad-hoc query cannot starve scheduled refreshes, and neither can block alert evaluation or cleanup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redash-worker-adhoc | `redash/redash:26.3.0` | Worker |
| redash-scheduler | `redash/redash:26.3.0` | Worker |
| redash-server | `redash/redash:26.3.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| redash-worker-scheduled | `redash/redash:26.3.0` | Worker |
| Redis | `redis:8.2` | Database |
| redash-worker-default | `redash/redash:26.3.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `QUEUES` | redash-worker-adhoc | queries | RQ queue this worker drains |
| `REDASH_HOST` | redash-worker-adhoc | - | Public base URL for links and emails |
| `WORKERS_COUNT` | redash-worker-adhoc | 2 | Worker processes in this service |
| `PYTHONUNBUFFERED` | redash-worker-adhoc | 1 | Stream Python output to logs |
| `REDASH_LOG_LEVEL` | redash-worker-adhoc | INFO | Application log verbosity |
| `REDASH_REDIS_URL` | redash-worker-adhoc | - | RQ broker for enqueued jobs |
| `REDASH_SECRET_KEY` | redash-worker-adhoc | (secret) | Shared data-source encryption key |
| `REDASH_DATABASE_URL` | redash-worker-adhoc | - | Redash metadata database |
| `REDASH_COOKIE_SECRET` | redash-worker-adhoc | (secret) | Shared session signing key |
| `REDASH_HOST` | redash-scheduler | - | Public base URL for links and emails |
| `PYTHONUNBUFFERED` | redash-scheduler | 1 | Stream Python output to logs |
| `REDASH_LOG_LEVEL` | redash-scheduler | INFO | Application log verbosity |
| `REDASH_REDIS_URL` | redash-scheduler | - | RQ broker for enqueued jobs |
| `REDASH_SECRET_KEY` | redash-scheduler | (secret) | Shared data-source encryption key |
| `REDASH_DATABASE_URL` | redash-scheduler | - | Redash metadata database |
| `REDASH_COOKIE_SECRET` | redash-scheduler | (secret) | Shared session signing key |
| `PORT` | redash-server | 5000 | Port Railway health-checks |
| `REDASH_HOST` | redash-server | - | Public base URL for links and emails |
| `PYTHONUNBUFFERED` | redash-server | 1 | Stream Python output to logs |
| `REDASH_LOG_LEVEL` | redash-server | INFO | Application log verbosity |
| `REDASH_REDIS_URL` | redash-server | - | RQ broker and rate-limit store |
| `REDASH_SECRET_KEY` | redash-server | (secret) | Encrypts stored data-source credentials |
| `REDASH_WEB_WORKERS` | redash-server | 4 | gunicorn worker processes |
| `REDASH_DATABASE_URL` | redash-server | - | Redash metadata database |
| `REDASH_ENFORCE_CSRF` | redash-server | true | CSRF validation on API requests |
| `REDASH_COOKIE_SECRET` | redash-server | (secret) | Session cookie signing key |
| `REDASH_ENFORCE_HTTPS` | redash-server | true | HSTS and Secure cookies |
| `REDASH_PROXIES_COUNT` | redash-server | 2 | Reverse proxy hops in front of Redash |
| `REDASH_GUNICORN_TIMEOUT` | redash-server | 60 | Request timeout in seconds |
| `REDASH_RATELIMIT_ENABLED` | redash-server | true | Throttle login attempts per IP |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `QUEUES` | redash-worker-scheduled | scheduled_queries,schemas | RQ queues this worker drains |
| `REDASH_HOST` | redash-worker-scheduled | - | Public base URL for links and emails |
| `WORKERS_COUNT` | redash-worker-scheduled | 1 | Worker processes in this service |
| `PYTHONUNBUFFERED` | redash-worker-scheduled | 1 | Stream Python output to logs |
| `REDASH_LOG_LEVEL` | redash-worker-scheduled | INFO | Application log verbosity |
| `REDASH_REDIS_URL` | redash-worker-scheduled | - | RQ broker for enqueued jobs |
| `REDASH_SECRET_KEY` | redash-worker-scheduled | (secret) | Shared data-source encryption key |
| `REDASH_DATABASE_URL` | redash-worker-scheduled | - | Redash metadata database |
| `REDASH_COOKIE_SECRET` | redash-worker-scheduled | (secret) | Shared session signing key |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `QUEUES` | redash-worker-default | periodic,emails,default | RQ queues this worker drains |
| `REDASH_HOST` | redash-worker-default | - | Public base URL for links and emails |
| `WORKERS_COUNT` | redash-worker-default | 1 | Worker processes in this service |
| `PYTHONUNBUFFERED` | redash-worker-default | 1 | Stream Python output to logs |
| `REDASH_LOG_LEVEL` | redash-worker-default | INFO | Application log verbosity |
| `REDASH_REDIS_URL` | redash-worker-default | - | RQ broker for enqueued jobs |
| `REDASH_SECRET_KEY` | redash-worker-default | (secret) | Shared data-source encryption key |
| `REDASH_DATABASE_URL` | redash-worker-default | - | Redash metadata database |
| `REDASH_COOKIE_SECRET` | redash-worker-default | (secret) | Shared session signing key |

## Configuration

- **Start command:** `/app/bin/docker-entrypoint worker`
- **Start command:** `/app/bin/docker-entrypoint scheduler`
- **Start command:** `/bin/sh -c 'for i in $(seq 1 30); do /app/manage.py database create_tables && break; echo "waiting for database ($i)"; sleep 5; done; /app/manage.py db upgrade; exec /app/bin/docker-entrypoint server'`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/redash-analytics)
