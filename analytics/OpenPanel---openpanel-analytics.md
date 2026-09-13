# Deploy OpenPanel on Railway

Web and product analytics with events, funnels and user profiles

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openpanel-analytics)

## About

OpenPanel is an open-source web and product analytics platform: the pageview reporting you expect from Plausible plus the events, funnels and profiles you expect from Mixpanel. It suits teams who want to know which pages bring visitors in *and* what those visitors then do, without handing that data to a vendor. Events land in your own ClickHouse instance, visitors are identified by a rotating salted hash rather than a tracking cookie, and every chart is queried from the raw event table.

Deploy OpenPanel on Railway and this template pre-configures the whole self-hosted stack: `caddy` as the public front door, `dashboard` for the interface, `api` for ingestion and the tRPC layer, `worker` for queues and scheduled jobs, `clickhouse` for the event store, managed `Postgres` and `Redis`, and a `mailpit` inbox so invitations and password resets work immediately. Browser traffic and SDK calls both reach `caddy`, which sends `/api*` to the API and everything else to the dashboard — one origin, one session cookie, no CORS to get wrong.

![Diagram of the eight OpenPanel services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789275795/openpanel-architecture.webp)

Self-host OpenPanel when analytics data is sensitive, when ad blockers eat a third of your traffic on a vendor domain, or when per-event pricing makes product analytics too expensive to leave on. Running it yourself means unlimited events, SQL-level access to the raw data and a tracker served from your own domain.

- Web analytics: visitors, sessions, bounce rate, referrers, UTM campaigns, entry and exit pages
- Product analytics: custom events, funnels, retention, cohorts, profiles and groups
- Realtime view with a live world map, saved reports, dashboards and public share links
- Session replay, Google Search Console SEO reporting, event notification rules
- SDKs for web, React, Next.js, Vue, Astro, React Native, Node, Laravel, Rust, Ruby, iOS and Android, plus a REST API

Each service has one job. `caddy` owns the public origin and forwards `/api*` to the API with the prefix stripped. `api` validates and enqueues events, serves the dashboard's tRPC calls and runs the Postgres and ClickHouse migrations at boot. `worker` drains the queue into ClickHouse, stitches sessions and runs cron jobs. `clickhouse` stores events; `Postgres` holds accounts, projects, reports and dashboards; `Redis` carries queues, caching and rate limits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | `lindesvard/openpanel-dashboard:2.3.0` | Worker |
| api | `lindesvard/openpanel-api:2.3.0` | Worker |
| worker | `lindesvard/openpanel-worker:2.3.0` | Worker |
| Redis | `redis:8.2` | Database |
| caddy | [gridalpha/openpanel-railway](https://github.com/gridalpha/openpanel-railway) | Web service |
| clickhouse | [gridalpha/openpanel-railway](https://github.com/gridalpha/openpanel-railway) | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | dashboard | UTC | Container timezone |
| `PORT` | dashboard | 3000 | Nitro server listening port |
| `API_URL` | dashboard | - | Public API base for the browser |
| `NODE_ENV` | dashboard | production | Production build behaviour |
| `REDIS_URL` | dashboard | - | Queue and cache connection |
| `SMTP_HOST` | dashboard | - | Outgoing mail host |
| `SMTP_PORT` | dashboard | 1025 | Outgoing mail port |
| `BATCH_SIZE` | dashboard | 5000 | Events per ClickHouse insert batch |
| `API_URL_SSR` | dashboard | - | Private API base for server rendering |
| `CONCURRENCY` | dashboard | 10 | Event processing concurrency |
| `SELF_HOSTED` | dashboard | true | Disables cloud-only features |
| `SMTP_SECURE` | dashboard | false | Plain SMTP on the private network |
| `DATABASE_URL` | dashboard | - | Postgres connection with a bounded pool |
| `EMAIL_SENDER` | dashboard | - | From address on outgoing mail |
| `NODE_OPTIONS` | dashboard | --max-old-space-size=1024 | Caps the Node heap |
| `COOKIE_SECRET` | dashboard | (secret) | Shared session cookie signing key |
| `DASHBOARD_URL` | dashboard | - | Public URL of the deployment |
| `BATCH_INTERVAL` | dashboard | 10000 | Batch flush interval in ms |
| `CLICKHOUSE_URL` | dashboard | - | Event store connection |
| `ENCRYPTION_KEY` | dashboard | - | Shared at-rest encryption key |
| `ALLOW_INVITATION` | dashboard | true | Owners can invite teammates |
| `ALLOW_REGISTRATION` | dashboard | false | Only the first account may register |
| `DATABASE_URL_DIRECT` | dashboard | - | Direct connection used by migrations |
| `CUSTOM_COOKIE_DOMAIN` | dashboard | - | Host-only session cookie domain |
| `TZ` | api | UTC | Container timezone |
| `PORT` | api | 3000 | Port Railway health-checks |
| `API_URL` | api | - | Public API base |
| `API_HOST` | api | :: | Dual-stack bind, required for private peers |
| `API_PORT` | api | 3000 | Port the Fastify server binds |
| `NODE_ENV` | api | production | Production build behaviour |
| `REDIS_URL` | api | - | Queue and cache connection |
| `SMTP_HOST` | api | - | Outgoing mail host |
| `SMTP_PORT` | api | 1025 | Outgoing mail port |
| `BATCH_SIZE` | api | 5000 | Events per ClickHouse insert batch |
| `CONCURRENCY` | api | 10 | Event processing concurrency |
| `SELF_HOSTED` | api | true | Disables cloud-only features |
| `SMTP_SECURE` | api | false | Plain SMTP on the private network |
| `DATABASE_URL` | api | - | Postgres connection with a bounded pool |
| `EMAIL_SENDER` | api | - | From address on outgoing mail |
| `NODE_OPTIONS` | api | --report-on-fatalerror --report-on-signal --report-directory=/tmp --max-old-space-size=1024 | Crash reports plus a heap cap |
| `COOKIE_SECRET` | api | (secret) | Session cookie signing key |
| `DASHBOARD_URL` | api | - | Public URL and CORS origin |
| `BATCH_INTERVAL` | api | 10000 | Batch flush interval in ms |
| `CLICKHOUSE_URL` | api | - | Event store connection |
| `ENCRYPTION_KEY` | api | - | 32-byte hex at-rest encryption key |
| `ALLOW_INVITATION` | api | true | Owners can invite teammates |
| `ALLOW_REGISTRATION` | api | false | Only the first account may register |
| `DATABASE_URL_DIRECT` | api | - | Direct connection used by migrations |
| `CUSTOM_COOKIE_DOMAIN` | api | - | Host-only session cookie domain |
| `TZ` | worker | UTC | Container timezone |
| `PORT` | worker | 3000 | Port Railway health-checks |
| `API_URL` | worker | - | Public API base |
| `NODE_ENV` | worker | production | Production build behaviour |
| `REDIS_URL` | worker | - | Queue and cache connection |
| `SMTP_HOST` | worker | - | Outgoing mail host |
| `SMTP_PORT` | worker | 1025 | Outgoing mail port |
| `BATCH_SIZE` | worker | 5000 | Events per ClickHouse insert batch |
| `CONCURRENCY` | worker | 10 | Event processing concurrency |
| `SELF_HOSTED` | worker | true | Disables cloud-only features |
| `SMTP_SECURE` | worker | false | Plain SMTP on the private network |
| `WORKER_PORT` | worker | 3000 | Port the worker's HTTP server binds |
| `DATABASE_URL` | worker | - | Postgres connection with a bounded pool |
| `EMAIL_SENDER` | worker | - | From address on outgoing mail |
| `NODE_OPTIONS` | worker | --max-old-space-size=1024 | Caps the Node heap |
| `COOKIE_SECRET` | worker | (secret) | Shared session cookie signing key |
| `DASHBOARD_URL` | worker | - | Public URL used in emails |
| `BATCH_INTERVAL` | worker | 10000 | Batch flush interval in ms |
| `CLICKHOUSE_URL` | worker | - | Event store connection |
| `ENCRYPTION_KEY` | worker | - | Shared at-rest encryption key |
| `ALLOW_INVITATION` | worker | true | Owners can invite teammates |
| `ALLOW_REGISTRATION` | worker | false | Only the first account may register |
| `DATABASE_URL_DIRECT` | worker | - | Direct connection used by migrations |
| `CUSTOM_COOKIE_DOMAIN` | worker | - | Host-only session cookie domain |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | caddy | 8080 | Public HTTP listener port |
| `API_HOST` | caddy | api.railway.internal:3000 | Upstream for /api* requests |
| `DASHBOARD_HOST` | caddy | dashboard.railway.internal:3000 | Upstream for everything else |
| `PORT` | clickhouse | 8123 | HTTP interface port |
| `CLICKHOUSE_DB` | clickhouse | openpanel | Database created on first boot |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for the default user |
| `TZ` | mailpit | UTC | Container timezone |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack web listener |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack SMTP listener |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |

## Configuration

- **Healthcheck:** `/api/healthcheck`
- **Start command:** `/bin/sh -c 'for i in $(seq 1 30); do CI=true pnpm -r run migrate:deploy && break; echo "[railway] migrations failed, retrying in 10s"; sleep 10; done; exec node dist/index.js'`
- **Healthcheck:** `/healthcheck`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/livez`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/openpanel-analytics)
