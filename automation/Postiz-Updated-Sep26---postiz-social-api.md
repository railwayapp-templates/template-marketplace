# Deploy Postiz [Updated Sep'26] on Railway

Self-host Postiz — schedule to 30+ platforms via your own REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-social-api)

## About

Postiz is an open-source social media scheduler with a full REST API — a self-hosted Buffer alternative you can drive programmatically. Beyond its dashboard, Postiz exposes an API and webhooks to create, schedule, and publish posts across 30+ platforms (X, LinkedIn, Instagram, TikTok, Reddit, and more) from your own code, an automation like n8n, or your product's backend. Own your social-posting API instead of paying per-call SaaS. This template deploys the full modern Postiz stack — including the Temporal engine that actually runs scheduled posts — so your programmatic scheduler is live in minutes.

---

This template hosts Postiz as a programmable posting backend, and getting its modern architecture right is what makes the API reliably publish — all handled here.

**A social-posting API you own — call it from anything.** Postiz exposes a REST API and webhooks, so any system that can make an HTTP request — your app's backend, an n8n or cron workflow, a SaaS product adding a "schedule to social" feature — can create and schedule posts across 30+ platforms through one endpoint. Instead of integrating each network's API and paying a per-call scheduling SaaS, you run your own posting API at flat cost. Generate an API key in the dashboard and point your code at it.

**Temporal is required now — or the API accepts posts that never publish.** Since v2.12, Postiz uses a Temporal workflow engine to execute scheduled posts. Without it, the app and API start and accept requests, but scheduled posts silently never go out — the most common modern Postiz failure. This template includes the full Temporal stack, so posts created via the API or dashboard actually fire on schedule.

**The URL variables must match your domain — or OAuth fails.** Connecting social accounts uses OAuth callbacks, so `MAIN_URL`, `FRONTEND_URL`, and `NEXT_PUBLIC_BACKEND_URL` (your domain plus `/api`) must point at your Railway public domain, or account connections fail. This template sets all three automatically, so linking accounts works once you add each platform's API keys, and the API can then post to them.
**Railway-specific fixes, and webhooks for automation.** Elasticsearch's config uses dotted env-var names Railway rejects, so this template uses a wrapped image that writes the config to a file at build time; `PORT` is set explicitly so routing reaches the container. Posts, accounts, and history persist in PostgreSQL, uploads and Temporal's database on volumes, so everything survives redeploys; `JWT_SECRET` is auto-generated and the first user becomes admin. Beyond outbound posting, Postiz fires webhooks on events and integrates with automation tools, so you can build two-way flows — trigger a post when your app ships a release, or notify your system when a post publishes.

Typical cost: **~$15–25/month** on Railway for the five-service stack — larger than older Postgres-and-Redis-only setups because Temporal and Elasticsearch are now part of Postiz, but it's what makes API-driven scheduling reliable. Postiz is AGPL-licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postiz_redis | `redis:8.2.1` | Database |
| temporal-ui | `temporalio/ui` | Worker |
| temporal-postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |
| temporal-admin-tools | `temporalio/admin-tools` | Worker |
| postiz_postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |
| temporal_server | `temporalio/auto-setup` | Worker |
| postiz-app | `ghcr.io/gitroomhq/postiz-app` | Database |
| elasticsearch-railway | [praveen-ks-2001/elasticsearch-railway](https://github.com/praveen-ks-2001/elasticsearch-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | postiz_redis | - | Internal Redis service hostname |
| `REDISPORT` | postiz_redis | 6379 | Default Redis server port |
| `REDISUSER` | postiz_redis | default | Redis authentication username |
| `REDIS_URL` | postiz_redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | postiz_redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | postiz_redis | (secret) | Redis authentication password |
| `REDIS_PUBLIC_URL` | postiz_redis | - | External Redis connection URI |
| `PORT` | temporal-ui | 8080 | Container HTTP listening port |
| `TEMPORAL_ADDRESS` | temporal-ui | - | Temporal server address for UI |
| `TEMPORAL_UI_PORT` | temporal-ui | 8080 | Port Temporal UI runs on |
| `TEMPORAL_CORS_ORIGINS` | temporal-ui | http://localhost:3000 | Allowed CORS origins for UI |
| `POSTGRES_DB` | temporal-postgres | temporal | Temporal service database name |
| `DATABASE_URL` | temporal-postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | temporal-postgres | (secret) | Temporal database username |
| `POSTGRES_PASSWORD` | temporal-postgres | (secret) | Password for Temporal Postgres user |
| `DATABASE_PUBLIC_URL` | temporal-postgres | - | External Postgres connection string |
| `TEMPORAL_ADDRESS` | temporal-admin-tools | - | Temporal service endpoint |
| `TEMPORAL_CLI_ADDRESS` | temporal-admin-tools | - | CLI connection address |
| `POSTGRES_DB` | postiz_postgres | railway | Postiz application database |
| `DATABASE_URL` | postiz_postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | postiz_postgres | (secret) | Postgres admin username |
| `POSTGRES_PASSWORD` | postiz_postgres | (secret) | Password for Postiz Postgres user |
| `DATABASE_PUBLIC_URL` | postiz_postgres | - | External Postgres connection string |
| `DB` | temporal_server | postgres12 | Database driver used by Temporal |
| `ES_PWD` | temporal_server | - | Elasticsearch authentication password |
| `DB_PORT` | temporal_server | 5432 | Postgres database port |
| `ES_PORT` | temporal_server | 9200 | Elasticsearch service port |
| `ES_USER` | temporal_server | (secret) | Elasticsearch username |
| `ES_SEEDS` | temporal_server | - | Elasticsearch host address |
| `ENABLE_ES` | temporal_server | true | Enable Elasticsearch visibility backend |
| `ES_SCHEME` | temporal_server | http | Elasticsearch connection protocol |
| `BIND_ON_IP` | temporal_server | 0.0.0.0 | Bind Temporal server on all interfaces |
| `ES_VERSION` | temporal_server | v7 | Elasticsearch API version compatibility |
| `POSTGRES_PWD` | temporal_server | - | Password for Temporal Postgres |
| `POSTGRES_USER` | temporal_server | (secret) | Username for Temporal Postgres |
| `POSTGRES_SEEDS` | temporal_server | - | Postgres host for Temporal |
| `TEMPORAL_ADDRESS` | temporal_server | 127.0.0.1:7233 | Local Temporal service address |
| `DEFAULT_NAMESPACE` | temporal_server | default | Namespace created at startup |
| `TEMPORAL_NAMESPACE` | temporal_server | default | Default workflow namespace |
| `TEMPORAL_BROADCAST_ADDRESS` | temporal_server | 127.0.0.1 | Broadcast address for cluster nodes |
| `SKIP_DEFAULT_NAMESPACE_CREATION` | temporal_server | false | Create namespace automatically |
| `PORT` | postiz-app | 3000 | HTTP server listening port |
| `MAIN_URL` | postiz-app | - | Primary public application URL |
| `RUN_CRON` | postiz-app | true | Enable scheduled background jobs |
| `REDIS_URL` | postiz-app | - | Redis connection for queues |
| `IS_GENERAL` | postiz-app | true | Enable general multi-user mode |
| `JWT_SECRET` | postiz-app | (secret) | Secret for signing authentication tokens |
| `NOT_SECURED` | postiz-app | true | Disable strict security protections |
| `DATABASE_URL` | postiz-app | - | Postiz Postgres database connection |
| `FRONTEND_URL` | postiz-app | - | Public frontend interface URL |
| `STORAGE_PROVIDER` | postiz-app | local | Use local filesystem storage |
| `TEMPORAL_ADDRESS` | postiz-app | - | Temporal workflow service address |
| `UPLOAD_DIRECTORY` | postiz-app | /uploads | Local directory storing uploaded files |
| `BACKEND_INTERNAL_URL` | postiz-app | http://localhost:3000 | Internal backend service address |
| `DISABLE_REGISTRATION` | postiz-app | false | Allow new user registrations |
| `NEXT_PUBLIC_BACKEND_URL` | postiz-app | - | Public backend API endpoint |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | postiz-app | /uploads | Public upload directory path |
| `PORT` | elasticsearch-railway | 9200 | Elasticsearch HTTP service port |
| `ES_JAVA_OPTS` | elasticsearch-railway | -Xms256m -Xmx512m | JVM heap memory settings |
| `ELASTIC_PASSWORD` | elasticsearch-railway | (secret) | Password for Elasticsearch authentication |
| `ELASTIC_USERNAME` | elasticsearch-railway | (secret) | Elasticsearch admin username |

## Configuration

- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/uploads`
- **Volume:** `/esdata`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/postiz-social-api)
