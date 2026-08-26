# Deploy Rybbit on Railway

Web analytics that shows who visits your site and what they do

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rybbit-web-analytics)

## About

Rybbit is an open-source, privacy-friendly analytics platform that answers the questions Google Analytics makes hard: which pages people actually read, where they came from, and where they give up. It is cookieless, needs no consent banner, and goes well past a pageview counter — sessions, funnels, retention cohorts, user journeys, session replay, Core Web Vitals and error tracking all ship in the open-source build. Product teams, indie developers and agencies self-host Rybbit for the depth of a product-analytics tool without handing visitor data to a third party.

Self-host Rybbit on Railway and you get the full production topology, not a single container. The template runs six services: a **Caddy** front door on the public domain, the **backend** API and ingest service, the **client** dashboard, **ClickHouse** for event storage, **Postgres** for accounts and site configuration, and **Redis** for session resolution and bot scoring. Caddy is what lets one domain serve both halves — it routes `/api/*` and the OAuth discovery documents to the backend and everything else to the dashboard, so the browser talks to a single origin and the login cookie behaves.

![Rybbit services on Railway behind a Caddy front door](https://res.cloudinary.com/rroe4rtk/image/upload/v1787605911/rybbit-architecture.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy | [gridalpha/rybbit-railway](https://github.com/gridalpha/rybbit-railway) (root: caddy) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| backend | `ghcr.io/rybbit-io/rybbit-backend:v2.8.0` | Worker |
| Redis | `redis:8.2` | Database |
| client | `ghcr.io/rybbit-io/rybbit-client:v2.8.0` | Worker |
| clickhouse | [gridalpha/rybbit-railway](https://github.com/gridalpha/rybbit-railway) (root: clickhouse) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | caddy | 8080 | HTTP listening port for the proxy |
| `CLIENT_HOST` | caddy | - | Rybbit dashboard upstream |
| `BACKEND_HOST` | caddy | - | Rybbit API upstream |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | backend | 3001 | API listening port |
| `BASE_URL` | backend | - | Public URL and trusted CORS origin |
| `NODE_ENV` | backend | production | Enables Secure session cookies |
| `REDIS_HOST` | backend | - | Redis private hostname |
| `REDIS_PORT` | backend | - | Redis port |
| `POSTGRES_DB` | backend | - | Application database |
| `NODE_OPTIONS` | backend | --max-old-space-size=1024 | Node heap ceiling per process |
| `CLICKHOUSE_DB` | backend | - | Analytics database name |
| `POSTGRES_HOST` | backend | - | Postgres private hostname |
| `POSTGRES_PORT` | backend | - | Postgres port |
| `POSTGRES_USER` | backend | (secret) | Application database user |
| `DISABLE_SIGNUP` | backend | false | Set true after creating the admin account |
| `REDIS_PASSWORD` | backend | (secret) | Redis auth password |
| `CLICKHOUSE_HOST` | backend | - | ClickHouse HTTP endpoint |
| `CLUSTER_WORKERS` | backend | 2 | Worker processes; cron runs on the primary |
| `POSTGRES_PASSWORD` | backend | (secret) | Application database password |
| `BETTER_AUTH_SECRET` | backend | (secret) | Session signing key, must stay stable |
| `CLICKHOUSE_PASSWORD` | backend | (secret) | ClickHouse default-user password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | client | 3002 | Dashboard listening port |
| `HOSTNAME` | client | 0.0.0.0 | Next.js bind address |
| `NODE_ENV` | client | production | Next.js production mode |
| `NODE_OPTIONS` | client | --max-old-space-size=1024 | Node heap ceiling |
| `NEXT_PUBLIC_BACKEND_URL` | client | - | Public origin for server routes |
| `PORT` | clickhouse | 8123 | HTTP interface port |
| `CLICKHOUSE_DB` | clickhouse | analytics | Database created on first boot |
| `CLICKHOUSE_USER` | clickhouse | (secret) | User created on first boot |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for the default user |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/login`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/rybbit-web-analytics)
