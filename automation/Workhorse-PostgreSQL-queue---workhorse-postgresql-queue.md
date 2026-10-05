# Deploy Workhorse PostgreSQL queue on Railway

PostgreSQL durable tasks with crash recovery and protected dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/workhorse-postgresql-queue)

## About

PostgreSQL durable tasks with crash recovery and protected dashboard.

Three independently deployed services: PostgreSQL 17.11, a Node.js 24 worker with Workhorse SDK 0.6.1, and the matching read-only dashboard. No Redis, broker, shared service disk, Docker socket, or public database. Workhorse is public beta; this is an evaluation/small-team queue recipe, not an exactly-once or HA guarantee.

The worker's pre-deploy command installs Workhorse's ordered schema plus the recipe effect table. Runtime worker/dashboard processes only assert schema compatibility. Dashboard startup waits for the schema gate. Run the pre-deploy installer once per release, not from each worker replica; migrations require the database to already be available.

The task `recipe.effect` validates bounded input, deliberately fails once, saves a named preparation checkpoint, performs a lease-releasing durable wait, and writes one uniquely keyed database effect. A checkpoint callback can execute again after a crash between its effect and checkpoint write: SQL's unique key makes this fixture safe. External providers still need stable idempotency keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | [tech-progress/workhorse-postgres-queue](https://github.com/tech-progress/workhorse-postgres-queue) (branch: release-v1) (root: /) | Worker |
| Dashboard | [tech-progress/workhorse-postgres-queue](https://github.com/tech-progress/workhorse-postgres-queue) (branch: release-v1) (root: /) | Web service |
| Postgres | `postgres:17.11-bookworm@sha256:639ab7ceb90e13123085b741fb31ef493fba25463002f6da665352e7b534b652` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Worker | 3000 | Internal listener/probe target port; do not expose private services. |
| `DATABASE_URL` | Worker | - | Direct private PostgreSQL connection using service references; no public database endpoint. |
| `WORKER_CONCURRENCY` | Worker | 2 | Bounded process concurrency, integer 1-4; default 2 with an eight-connection pool. |
| `PORT` | Dashboard | 3000 | Internal listener/probe target port; do not expose private services. |
| `DATABASE_URL` | Dashboard | - | Direct private PostgreSQL connection using service references; no public database endpoint. |
| `DASHBOARD_PUBLIC_ORIGIN` | Dashboard | - | HTTPS public dashboard origin for upstream host/origin protection. |
| `WORKHORSE_DASHBOARD_PASSWORD` | Dashboard | (secret) | Generated administrator password (minimum 16 characters); hashed in memory before authentication. |
| `WORKHORSE_DASHBOARD_USERNAME` | Dashboard | (secret) | Single read-only operator username. |
| `PORT` | Postgres | 5432 | Internal listener/probe target port; do not expose private services. |
| `POSTGRES_DB` | Postgres | workhorse | Durable queue database name. |
| `POSTGRES_USER` | Postgres | (secret) | Database owner for schema installation; isolate from other applications. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated alphanumeric database credential, referenced by applications. |

## Configuration

- **Start command:** `node app/worker.mjs`
- **Healthcheck:** `/readyz`
- **Start command:** `node app/dashboard.mjs`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Python, JavaScript, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/workhorse-postgresql-queue)
