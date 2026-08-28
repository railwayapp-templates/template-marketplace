# Deploy Chartbrew on Railway

Build live charts and dashboards from your APIs and databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chartbrew-bi)

## About

Chartbrew is an open-source reporting platform that turns APIs, SQL databases and NoSQL collections into live dashboards you can share with a link or embed in your own product. You point it at a data source, describe the query once as a reusable dataset, then build as many charts on it as you need — line, bar, pie, table, KPI — without writing frontend code.

Deploy Chartbrew on Railway and you get the full production shape rather than a single container. The template runs four services: a **Chartbrew UI** service serving the React app, a **Chartbrew API** service running the REST API, the Socket.IO realtime channel, the BullMQ queues and the chart-refresh schedulers, a **PostgreSQL** database holding dashboards, datasets and encrypted connection credentials, and **Redis** backing the queues and cache. Only the API reaches Postgres and Redis, over the private network, and a volume on it stores logos and chart snapshots.

![Chartbrew UI and API services with Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787773104/chartbrew-architecture.png)

Chartbrew sits between a raw query tool and a full BI suite. Its unit of reuse is the dataset: one saved request or query several charts read from, so changing the query updates every chart built on it. Self-hosting matters because what you connect it to is usually your production database or an internal API — the credentials and cached results stay in your infrastructure.

Key features:

- Connectors for REST APIs, PostgreSQL, MySQL, MongoDB, Firestore, ClickHouse, Timescale, Supabase, Google Analytics, Stripe and Jira
- Reusable datasets with joins, filters, variables and formula fields
- Line, bar, pie, doughnut, radar, table, KPI and gauge charts
- Public, password-protected and embeddable dashboards
- Scheduled refreshes and snapshot reports by email or Slack
- Teams with per-member roles, and an optional AI chart assistant

The UI service is a static bundle; the API owns every database call, every request to your data sources, and the cron jobs that refresh charts on schedule. Postgres stores structure and credentials, encrypted at rest with a key you control. Redis holds the job queues, the query cache and the realtime adapter.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| chartbrew-api | [gridalpha/chartbrew-railway](https://github.com/gridalpha/chartbrew-railway) | Web service |
| chartbrew | [gridalpha/chartbrew-railway](https://github.com/gridalpha/chartbrew-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the image |
| `PORT` | chartbrew-api | 4019 | HTTP port Railway probes |
| `CB_ROLE` | chartbrew-api | api | Run the REST API, queues and crons |
| `CB_SECRET` | chartbrew-api | (secret) | Legacy encryption key, keep stable |
| `CB_DB_HOST` | chartbrew-api | - | Private Postgres hostname |
| `CB_DB_NAME` | chartbrew-api | - | Application database name |
| `CB_DB_PORT` | chartbrew-api | - | Postgres port |
| `CB_API_HOST` | chartbrew-api | 0.0.0.0 | Bind address for the API server |
| `CB_API_PORT` | chartbrew-api | 4019 | Port the API server binds |
| `NODE_OPTIONS` | chartbrew-api | --max-old-space-size=2048 | Cap the Node heap for the container |
| `CB_DB_DIALECT` | chartbrew-api | postgres | Database engine in use |
| `CB_REDIS_HOST` | chartbrew-api | - | Private Redis hostname |
| `CB_REDIS_PORT` | chartbrew-api | - | Redis port |
| `CB_DB_PASSWORD` | chartbrew-api | (secret) | Postgres password |
| `CB_DB_USERNAME` | chartbrew-api | (secret) | Postgres user |
| `CB_ENCRYPTION_KEY` | chartbrew-api | - | AES key for sessions and stored credentials |
| `CB_REDIS_PASSWORD` | chartbrew-api | (secret) | Redis password |
| `CB_RESTRICT_TEAMS` | chartbrew-api | 0 | Required so the first account gets a team |
| `CB_BULLMQ_PASSWORD` | chartbrew-api | (secret) | Basic auth password for the queue dashboard |
| `CB_BULLMQ_USERNAME` | chartbrew-api | (secret) | Basic auth user for the queue dashboard |
| `CB_RESTRICT_SIGNUP` | chartbrew-api | 1 | Only the first account may sign up |
| `VITE_APP_CLIENT_HOST` | chartbrew-api | - | Public UI origin for CORS and links |
| `CB_INITIAL_ADMIN_NAME` | chartbrew-api | Chartbrew Admin | Display name of the seeded account |
| `CB_INITIAL_ADMIN_EMAIL` | chartbrew-api | admin@example.com | Email of the seeded account |
| `CB_INITIAL_ADMIN_PASSWORD` | chartbrew-api | (secret) | Password of the seeded account |
| `CB_ALLOW_LEGACY_SHARE_TOKENS` | chartbrew-api | (secret) | Off on new installations |
| `CB_ALLOW_PRIVATE_NETWORK_CALLS` | chartbrew-api | false | Set true to query private network hosts |
| `PORT` | chartbrew | 4018 | HTTP port for the UI service |
| `CB_ROLE` | chartbrew | client | Serve the built frontend bundle |
| `VITE_APP_API_HOST` | chartbrew | - | Public URL of the API service |
| `VITE_APP_CLIENT_HOST` | chartbrew | - | Public URL of this UI service |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/code/server/uploads`

**Category:** Analytics · **Languages:** Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/chartbrew-bi)
