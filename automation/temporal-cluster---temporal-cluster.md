# Deploy temporal-cluster on Railway

Open Source Durable Workflow Engine. Retries, schedules & timers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/temporal-cluster)

## About

Temporal is a durable execution engine for code that has to finish. You write an ordinary function — charge a card, provision an account, run a reconciliation — and Temporal records every step, so a crashed process, a redeploy or a third-party API that is down for an hour does not lose the work. Execution resumes from the last completed step. Stripe, Netflix and Datadog run it in production.

This template runs a full multi-service Temporal cluster, not a single-container development server. The four server roles — frontend, history, matching and worker — each get their own Railway service, the topology Temporal's own Helm chart deploys, so a busy role scales without touching the others. Managed Postgres holds both the execution history and the visibility index, so no Elasticsearch is required, and the Web UI runs privately behind a Caddy gateway terminating HTTP basic authentication. Self-host Temporal on Railway and you get the production shape on the first deploy.

![Temporal server roles, web UI and Postgres on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787131764/temporal-architecture.png)

Temporal separates *what* your business logic does from *when and whether* it succeeds. Your workflow code runs on your own workers; the cluster stores every event, retries failed steps on a policy you configure, keeps timers that survive restarts, and guarantees a started workflow reaches a terminal state — which is what teams want when cron jobs and queue consumers stop being enough.

Key features:

- **Durable state** — per-workflow event history, so a restart replays instead of restarting
- **Automatic retries and timeouts** as activity-level policy, not hand-written loops
- **Long-running workflows** — timers measured in days or months, not held in memory
- **Signals, queries, updates and schedules**, replacing cron for recurring work
- **A Web UI** for searching executions and terminating runs

One service per responsibility: **temporal-frontend** is the API gateway clients and workers connect to; **temporal-history** owns the shards and event history; **temporal-matching** hosts the task queues that hand work to workers; **temporal-worker** runs Temporal's own system workflows; **Postgres** stores the `temporal` and `temporal_visibility` databases; **temporal-ui** serves the dashboard; **proxy** holds the only public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| temporal-worker | [gridalpha/temporal-railway](https://github.com/gridalpha/temporal-railway) (root: server) | Worker |
| temporal-ui | `temporalio/ui:latest` | Worker |
| proxy | [gridalpha/temporal-railway](https://github.com/gridalpha/temporal-railway) (root: proxy) | Web service |
| temporal-history | [gridalpha/temporal-railway](https://github.com/gridalpha/temporal-railway) (root: server) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| temporal-frontend | [gridalpha/temporal-railway](https://github.com/gridalpha/temporal-railway) (root: server) | Worker |
| temporal-matching | [gridalpha/temporal-railway](https://github.com/gridalpha/temporal-railway) (root: server) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB` | temporal-worker | postgres12 | Persistence plugin name |
| `PORT` | temporal-worker | 9090 | Port Railway health-checks |
| `DBNAME` | temporal-worker | temporal | Persistence database name |
| `DB_PORT` | temporal-worker | 5432 | Postgres port |
| `ENABLE_ES` | temporal-worker | false | Use Postgres visibility, not Elasticsearch |
| `LOG_LEVEL` | temporal-worker | info | Server log verbosity |
| `BIND_ON_IP` | temporal-worker | :: | Dual-stack listen address |
| `POSTGRES_PWD` | temporal-worker | - | Shared with the other roles |
| `POSTGRES_USER` | temporal-worker | (secret) | Temporal's own database role |
| `POSTGRES_SEEDS` | temporal-worker | - | Private Postgres hostname |
| `TEMPORAL_SERVICES` | temporal-worker | worker | Server role this service runs |
| `VISIBILITY_DBNAME` | temporal-worker | temporal_visibility | Visibility database name |
| `NUM_HISTORY_SHARDS` | temporal-worker | 512 | Must match every other role |
| `PROMETHEUS_ENDPOINT` | temporal-worker | 0.0.0.0:9090 | Metrics listener address |
| `PORT` | temporal-ui | 8080 | Port Railway health-checks |
| `TEMPORAL_ADDRESS` | temporal-ui | - | Frontend gRPC address |
| `TEMPORAL_UI_PORT` | temporal-ui | 8080 | Web UI listening port |
| `TEMPORAL_CORS_ORIGINS` | temporal-ui | - | Allowed browser origin |
| `TEMPORAL_DEFAULT_NAMESPACE` | temporal-ui | default | Namespace opened on load |
| `TEMPORAL_DISABLE_NEWS_FETCH` | temporal-ui | true | No outbound call for release notes |
| `TEMPORAL_CSRF_COOKIE_INSECURE` | temporal-ui | false | Keep the CSRF cookie Secure |
| `PORT` | proxy | 8080 | Caddy listening port |
| `UPSTREAM` | proxy | - | Web UI backend address |
| `UI_PASSWORD` | proxy | (secret) | Web UI password |
| `UI_USERNAME` | proxy | (secret) | Web UI username |
| `DB` | temporal-history | postgres12 | Persistence plugin name |
| `PORT` | temporal-history | 9090 | Port Railway health-checks |
| `DBNAME` | temporal-history | temporal | Persistence database name |
| `DB_PORT` | temporal-history | 5432 | Postgres port |
| `ENABLE_ES` | temporal-history | false | Use Postgres visibility, not Elasticsearch |
| `LOG_LEVEL` | temporal-history | info | Server log verbosity |
| `BIND_ON_IP` | temporal-history | :: | Dual-stack listen address |
| `POSTGRES_PWD` | temporal-history | - | Shared with the other roles |
| `POSTGRES_USER` | temporal-history | (secret) | Temporal's own database role |
| `POSTGRES_SEEDS` | temporal-history | - | Private Postgres hostname |
| `TEMPORAL_SERVICES` | temporal-history | history | Server role this service runs |
| `VISIBILITY_DBNAME` | temporal-history | temporal_visibility | Visibility database name |
| `NUM_HISTORY_SHARDS` | temporal-history | 512 | Must match every other role |
| `PROMETHEUS_ENDPOINT` | temporal-history | 0.0.0.0:9090 | Metrics listener address |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `DB` | temporal-frontend | postgres12 | Persistence plugin name |
| `PORT` | temporal-frontend | 9090 | Port Railway health-checks |
| `DBNAME` | temporal-frontend | temporal | Persistence database name |
| `DB_PORT` | temporal-frontend | 5432 | Postgres port |
| `ENABLE_ES` | temporal-frontend | false | Use Postgres visibility, not Elasticsearch |
| `LOG_LEVEL` | temporal-frontend | info | Server log verbosity |
| `BIND_ON_IP` | temporal-frontend | :: | Dual-stack listen address |
| `POSTGRES_PWD` | temporal-frontend | - | Password for that role |
| `POSTGRES_USER` | temporal-frontend | (secret) | Temporal's own database role |
| `POSTGRES_SEEDS` | temporal-frontend | - | Private Postgres hostname |
| `DEFAULT_NAMESPACE` | temporal-frontend | default | Namespace created at first boot |
| `TEMPORAL_SERVICES` | temporal-frontend | frontend | Server role this service runs |
| `VISIBILITY_DBNAME` | temporal-frontend | temporal_visibility | Visibility database name |
| `NUM_HISTORY_SHARDS` | temporal-frontend | 512 | Shard count, fixed at first boot |
| `PROMETHEUS_ENDPOINT` | temporal-frontend | 0.0.0.0:9090 | Metrics listener address |
| `TEMPORAL_SCHEMA_SETUP` | temporal-frontend | true | This role applies the schema |
| `DEFAULT_NAMESPACE_RETENTION` | temporal-frontend | 72h | Closed workflow history retention |
| `TEMPORAL_ADMIN_DATABASE_URL` | temporal-frontend | - | Superuser URL, first-boot provisioning only |
| `TEMPORAL_REGISTER_DEFAULT_NAMESPACE` | temporal-frontend | true | This role registers the namespace |
| `DB` | temporal-matching | postgres12 | Persistence plugin name |
| `PORT` | temporal-matching | 9090 | Port Railway health-checks |
| `DBNAME` | temporal-matching | temporal | Persistence database name |
| `DB_PORT` | temporal-matching | 5432 | Postgres port |
| `ENABLE_ES` | temporal-matching | false | Use Postgres visibility, not Elasticsearch |
| `LOG_LEVEL` | temporal-matching | info | Server log verbosity |
| `BIND_ON_IP` | temporal-matching | :: | Dual-stack listen address |
| `POSTGRES_PWD` | temporal-matching | - | Shared with the other roles |
| `POSTGRES_USER` | temporal-matching | (secret) | Temporal's own database role |
| `POSTGRES_SEEDS` | temporal-matching | - | Private Postgres hostname |
| `TEMPORAL_SERVICES` | temporal-matching | matching | Server role this service runs |
| `VISIBILITY_DBNAME` | temporal-matching | temporal_visibility | Visibility database name |
| `NUM_HISTORY_SHARDS` | temporal-matching | 512 | Must match every other role |
| `PROMETHEUS_ENDPOINT` | temporal-matching | 0.0.0.0:9090 | Metrics listener address |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/temporal-cluster)
