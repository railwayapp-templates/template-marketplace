# Deploy Postiz [Updated Aug '26] on Railway

Postiz [Aug '26] (Schedule Posts to X, LinkedIn & Reddit) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-updated-jul-26)

## About

Postiz is the open-source social media scheduling platform that lets you plan, publish, and analyze posts across Twitter/X, LinkedIn, Reddit, Facebook, TikTok, and a dozen other platforms from one dashboard. Think Buffer or Hootsuite, but you own the data and pay no per-channel fees.

Buffer's Team plan costs $60/month for 10 channels. Hootsuite starts at $99/month. Postiz self-hosted on Railway costs a flat infrastructure fee regardless of how many accounts or channels you connect, so for a five-person marketing team managing a dozen social accounts, that gap is real money every single month, not a rounding error.

The bigger reason teams choose self-hosting here isn't just the price, though. It's what you're actually trusting a third party with. Buffer and Hootsuite hold your social media OAuth tokens on their own infrastructure, meaning a breach on their end is a breach of your accounts too. Self-hosting keeps those tokens, your scheduled content, and your analytics data on infrastructure you control. For agencies managing client accounts specifically, that's not a nice-to-have, it's often a real client-trust requirement.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| selfless-dedication | [shruti060701/railway-postiz](https://github.com/shruti060701/railway-postiz) | Worker |
| remarkable-patience | [shruti060701/railway-postiz](https://github.com/shruti060701/railway-postiz) | Worker |
| temporal-postgres | `postgres:16` | Database |
| railway-postiz | [shruti060701/railway-postiz](https://github.com/shruti060701/railway-postiz) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| temporal-ui | `temporalio/ui:2.34.0` | Worker |
| Redis | `redis:8.2.1` | Database |
| temporal-admin-tools | `temporalio/admin-tools:1.28.1-tctl-1.18.4-cli-1.4.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ES_JAVA_OPTS` | selfless-dedication | -Xms256m -Xmx256m | Caps JVM heap size. Matches the official reference exactly — don't increase without reason, Elasticsearch here only serves Temporal's internal visibility queries, not real search traffic. |
| `discovery.type` | selfless-dedication | single-node | **Required — confirmed via a real crash, not a preemptive guess.** Without this, Elasticsearch refuses to start with `"the default discovery settings are unsuitable for production use..."`, since it assumes it's joining a multi-node production cluster. Runs as a single-node cluster here, appropriate for this use case (Temporal's internal visibility store), not a real multi-node search deployment. |
| `xpack.security.enabled` | selfless-dedication | false | Disables Elasticsearch's own auth layer — acceptable since this service has no public port and is only reachable from `remarkable-patience` over Railway's private network. |
| `cluster.routing.allocation.disk.watermark.low` | selfless-dedication | 512mb | Disk watermark thresholds, matches official reference defaults. |
| `cluster.routing.allocation.disk.watermark.high` | selfless-dedication | 256mb | Disk watermark threshold. |
| `cluster.routing.allocation.disk.threshold_enabled` | selfless-dedication | true | Enables disk-based shard allocation limits. |
| `cluster.routing.allocation.disk.watermark.flood_stage` | selfless-dedication | 128mb | Disk watermark threshold. |
| `DB` | remarkable-patience | postgres12 | Tells Temporal's auto-setup which DB driver dialect to use. |
| `DB_PORT` | remarkable-patience | 5432 | Port for `temporal-postgres`. |
| `ES_SEEDS` | remarkable-patience | - | Internal hostname of the Elasticsearch service. **Use the real service name `selfless-dedication`, not a generic `elasticsearch` placeholder.** |
| `ENABLE_ES` | remarkable-patience | true | Enables the Elasticsearch-backed visibility store. |
| `ES_VERSION` | remarkable-patience | v7 | Matches the pinned `elasticsearch:7.17.27` image. |
| `POSTGRES_PWD` | remarkable-patience | - | Cross-service reference — same reasoning. |
| `POSTGRES_USER` | remarkable-patience | (secret) | Cross-service reference — must match `temporal-postgres` exactly. |
| `POSTGRES_SEEDS` | remarkable-patience | - | Internal hostname of Temporal's own Postgres. |
| `TEMPORAL_NAMESPACE` | remarkable-patience | default | Default Temporal namespace. |
| `DYNAMIC_CONFIG_FILE_PATH` | remarkable-patience | config/dynamicconfig/development-sql.yaml | Path (relative to the image's own working directory, `/etc/temporal`) to the config file baked into the custom Dockerfile. |
| `POSTGRES_USER` | temporal-postgres | (secret) | Matches what `remarkable-patience`'s own `POSTGRES_USER` variable must reference. |
| `POSTGRES_PASSWORD` | temporal-postgres | (secret) | Auto-generated. Must match what's referenced on `remarkable-patience` — set as a cross-service reference there, not independently generated (same class of desync bug already caught on this project's Typebot template). |
| `PORT` | railway-postiz | 5000 | **Must be set as an explicit Railway variable, not just a Dockerfile default** — Railway's own edge routing needs this visible at the platform level to know where to send traffic. Confirmed the hard way on this project's Metabase template: a Dockerfile-only `ENV PORT` is invisible to Railway's routing and causes every request to hit Railway's own fallback response instead of the app. |
| `MAIN_URL` | railway-postiz | - | Public URL of the Postiz instance. |
| `REDIS_URL` | railway-postiz | - | Required (not optional, unlike some other templates' Redis) — Postiz uses Redis for queueing and caching core functionality. |
| `JWT_SECRET` | railway-postiz | (secret) | igns authentication tokens. Auto-generated per deployment. |
| `DATABASE_URL` | railway-postiz | - | Postiz's own metadata database (posts, integrations, users). Uses a standard `postgres://` URL — no special format quirk here, unlike some other templates in this project. |
| `FRONTEND_URL` | railway-postiz | - | Same as `MAIN_URL` — used by the frontend build. |
| `TEMPORAL_ADDRESS` | railway-postiz | - | Address of the Temporal server. Required — Postiz v2.12+ cannot run without Temporal reachable. **Use the real service name `remarkable-patience` here, not a generic `temporal` placeholder.** |
| `NEXT_PUBLIC_BACKEND_URL` | railway-postiz | - | Public API base URL the frontend calls. |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | railway-postiz | /uploads | Public-facing path for uploaded media, matches `UPLOAD_DIRECTORY` (already baked into the Dockerfile). |
| `POSTGRES_DB` | Postgres | railway | Default database name created on startup. |
| `DATABASE_URL` | Postgres | - | Postiz's primary connection string, referenced by `railway-postiz`. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the Postgres superuser account. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated superuser password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public/external connection string for reaching this database from outside Railway's network. |
| `TEMPORAL_ADDRESS` | temporal-ui | - | Points at the real Temporal server service name. |
| `REDISHOST` | Redis | - | Internal hostname. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on internally. |
| `REDISUSER` | Redis | default | Default Redis username. |
| `REDIS_URL` | Redis | - | Primary connection string, referenced by `railway-postiz`. |
| `REDISPASSWORD` | Redis | (secret) | Redis auth password. |
| `REDIS_PASSWORD` | Redis | (secret) | Duplicate of `REDISPASSWORD` under a different variable name. |
| `REDIS_PUBLIC_URL` | Redis | - | Public/external connection string for reaching Redis from outside Railway's network. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS · **Languages:** Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/postiz-updated-jul-26)
