# Deploy Temporal v1 Durable Workflows Server on Railway

Reliable, retryable workflows in any language. Temporal server plus Web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/temporal-v1-durable-workflows-server)

## About

Temporal is an open-source durable execution platform: you write workflows as ordinary code in Go, Java, TypeScript, Python, .NET, PHP or Ruby, and Temporal persists every step so they survive crashes, retries and deploys. This community template runs a self-hosted Temporal Server with PostgreSQL and a password-protected Web UI on Railway.

A self-hosted Temporal cluster needs the Temporal Server (frontend, history, matching and internal worker roles), a database for workflow state, a visibility store for searching workflows, and usually the Web UI. This template runs the server roles in one service on the official `temporalio/server` image, stores both persistence and visibility in PostgreSQL (SQL advanced visibility, no Elasticsearch required), and creates or upgrades the database schema with Temporal's own `temporal-sql-tool` in a Railway pre-deploy step. A one-shot job registers the `default` namespace. The Web UI stays on the private network behind a small Caddy gateway with basic authentication, and the gRPC frontend is reachable by your workers over Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| temporal-ui | `temporalio/ui:2.55.0` | Worker |
| temporal-ui-gateway | [baranberkay96/temporal-railway](https://github.com/baranberkay96/temporal-railway) (branch: main) (root: /services/ui-gateway) | Web service |
| temporal | [baranberkay96/temporal-railway](https://github.com/baranberkay96/temporal-railway) (branch: main) (root: /services/temporal) | Worker |
| temporal-namespace | `temporalio/admin-tools:1.32.1` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | temporal-ui | 8080 | UI port (private only; exposed through temporal-ui-gateway). |
| `TEMPORAL_ADDRESS` | temporal-ui | - | Temporal frontend (private network). |
| `TEMPORAL_UI_PORT` | temporal-ui | 8080 | Port the UI server listens on. |
| `TEMPORAL_AUTH_ENABLED` | temporal-ui | false | Set true and fill TEMPORAL_AUTH_* to add OIDC login on top of basic auth. |
| `TEMPORAL_CORS_ORIGINS` | temporal-ui | - | Public origin of the UI (gateway domain). |
| `TEMPORAL_DEFAULT_NAMESPACE` | temporal-ui | default | Namespace opened by default. |
| `PORT` | temporal-ui-gateway | 8080 | Gateway port. |
| `UPSTREAM_URL` | temporal-ui-gateway | - | Private address of the UI service. |
| `BASIC_AUTH_PASSWORD` | temporal-ui-gateway | (secret) | Password for the Temporal Web UI (generated; hashed with bcrypt at start). |
| `BASIC_AUTH_USERNAME` | temporal-ui-gateway | (secret) | Login for the Temporal Web UI. |
| `DB` | temporal | postgres12 | Persistence plugin (PostgreSQL 12+ SQL plugin, as in upstream compose). |
| `PORT` | temporal | 7243 | Frontend HTTP API port; Railway probes /api/v1/system-info on it. |
| `DBNAME` | temporal | temporal | Persistence database. |
| `DB_PORT` | temporal | 5432 | PostgreSQL port. |
| `LOG_LEVEL` | temporal | info | Server log level. |
| `BIND_ON_IP` | temporal | ::0 | Listen on all IPv4+IPv6 interfaces (private network + optional TCP proxy). |
| `POSTGRES_PWD` | temporal | - | PostgreSQL password. |
| `POSTGRES_USER` | temporal | (secret) | PostgreSQL user (needs CREATE DATABASE on first deploy). |
| `POSTGRES_SEEDS` | temporal | - | PostgreSQL host (private network). |
| `TEMPORAL_ADDRESS` | temporal | - | gRPC address other Railway services use (copy into your workers). |
| `VISIBILITY_DBNAME` | temporal | temporal_visibility | Visibility database (SQL advanced visibility on PostgreSQL). |
| `NUM_HISTORY_SHARDS` | temporal | 512 | History shards. FIXED at first start; cannot be changed later. 512 = Temporal's small-production guidance. |
| `TEMPORAL_BROADCAST_ADDRESS` | temporal | 127.0.0.1 | Membership/cluster address for this single-node (all roles) server. |
| `TEMPORAL_ADDRESS` | temporal-namespace | - | Temporal frontend (private network). |
| `DEFAULT_NAMESPACE` | temporal-namespace | default | Namespace created on first deploy. |
| `DEFAULT_NAMESPACE_RETENTION` | temporal-namespace | 7d | Retention of closed workflow histories in that namespace. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/v1/system-info`
- **Start command:** `/bin/sh -c 'i=0; until temporal operator cluster health --address "$TEMPORAL_ADDRESS"; do i=$((i+1)); [ "$i" -ge 90 ] && echo "Temporal frontend not healthy" && exit 1; echo "waiting for Temporal frontend ($i)"; sleep 10; done; if temporal operator namespace describe -n "$DEFAULT_NAMESPACE" --address "$TEMPORAL_ADDRESS" >/dev/null 2>&1; then echo "namespace $DEFAULT_NAMESPACE already exists"; else temporal operator namespace create -n "$DEFAULT_NAMESPACE" --retention "$DEFAULT_NAMESPACE_RETENTION" --address "$TEMPORAL_ADDRESS"; fi'`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues · **Tags:** temporal, workflows, durable-execution, orchestration, microservices · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/temporal-v1-durable-workflows-server)
