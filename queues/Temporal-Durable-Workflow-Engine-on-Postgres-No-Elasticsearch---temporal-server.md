# Deploy Temporal | Durable Workflow Engine on Postgres (No Elasticsearch) on Railway

Durable workflows with Web UI and Postgres visibility, no Elasticsearch

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/temporal-server)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/temporal-server?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=temporal-server)

[Temporal](https://temporal.io/) is the open-source durable execution engine. You write workflows as ordinary code in Go, Java, TypeScript, Python, .NET, PHP or Ruby, and Temporal keeps them running through crashes, deploys and outages, with retries, timers, signals and full event history. This template runs the Temporal server with Postgres for both persistence and advanced visibility, so it needs no Elasticsearch, plus the Temporal Web UI behind a password.

The stack has four services: Temporal, Temporal-UI, Gateway and Postgres.

- **The production image, not auto-setup.** `temporalio/auto-setup` is a development convenience image. Temporal stopped publishing it after 1.29, and it never ran migrations safely on upgrade. This template runs the official `temporalio/server` image (pinned at 1.32.1) with `temporal-sql-tool` copied in from the matching `temporalio/admin-tools` image.
- **Schema migrations on every deploy.** Before the server starts, the entrypoint creates the `temporal` and `temporal_visibility` databases if needed, then runs `update-schema` on both. Railway's health check only passes once the server is answering. To upgrade, bump the image tag.
- **Advanced visibility on Postgres.** List filters such as `WorkflowType='Order' AND ExecutionStatus='Running'`, custom search attributes and workflow counts all run on Postgres 12+. Elasticsearch would add a JVM using 1 GB or more, and this template leaves it out.
- **A `default` namespace is ready.** It is created on first boot with 3-day retention.
- **The Web UI is password-protected.** The Temporal UI has no login of its own. The Gateway (Caddy) holds the public domain and asks for HTTP basic auth (`admin` and the generated `BASIC_AUTH_PASSWORD`) before anything reaches the UI. Temporal-UI and Temporal are on the private network only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Temporal | [nomideusz/temporal-railway](https://github.com/nomideusz/temporal-railway) (root: /server) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Gateway | [nomideusz/temporal-railway](https://github.com/nomideusz/temporal-railway) (root: /gateway) | Web service |
| Temporal-UI | `temporalio/ui:2.55.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Temporal | 7243 | Frontend HTTP API port, used by Railway's health check - leave as is |
| `DB_PORT` | Temporal | 5432 | Postgres port |
| `POSTGRES_PWD` | Temporal | - | Postgres password |
| `POSTGRES_USER` | Temporal | (secret) | Postgres user (creates the temporal and temporal_visibility databases) |
| `POSTGRES_SEEDS` | Temporal | - | Postgres host on the private network |
| `DEFAULT_NAMESPACE` | Temporal | default | Namespace created on first boot (3 day retention) |
| `NUM_HISTORY_SHARDS` | Temporal | 4 | History shards. Fixed when the cluster is first created and can NEVER be changed later - raise it before the first deploy if you expect heavy load (Temporal suggests 512+ for large production clusters) |
| `POSTGRES_DB` | Postgres | temporal | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `PORT` | Gateway | 8080 | Port Railway routes to - leave as is |
| `UI_UPSTREAM` | Gateway | - | Temporal UI on the private network |
| `BASIC_AUTH_PASSWORD` | Gateway | (secret) | Password for the Temporal Web UI (the UI has no login of its own). The Gateway refuses to start without one |
| `BASIC_AUTH_USERNAME` | Gateway | (secret) | Username for the Temporal Web UI |
| `PORT` | Temporal-UI | 8080 | Port the UI listens on - leave as is |
| `TEMPORAL_ADDRESS` | Temporal-UI | - | Temporal frontend (gRPC) on the private network |
| `TEMPORAL_UI_PORT` | Temporal-UI | 8080 | Must match PORT |
| `TEMPORAL_AUTH_SCOPES` | Temporal-UI | openid,profile,email | OIDC scopes |
| `TEMPORAL_AUTH_ENABLED` | Temporal-UI | false | Set to true to require OIDC sign-in (Google, Auth0, Keycloak, Okta, ...) on top of the Gateway password |
| `TEMPORAL_CORS_ORIGINS` | Temporal-UI | - | Public URL the UI is opened from - add your custom domain here after adding one |
| `TEMPORAL_AUTH_CLIENT_ID` | Temporal-UI | - | OIDC client ID |
| `TEMPORAL_AUTH_CALLBACK_URL` | Temporal-UI | - | OIDC redirect URI to register with your provider |
| `TEMPORAL_AUTH_PROVIDER_URL` | Temporal-UI | - | OIDC issuer URL, e.g. https://accounts.google.com |
| `TEMPORAL_AUTH_CLIENT_SECRET` | Temporal-UI | (secret) | OIDC client secret |

## Configuration

- **Healthcheck:** `/api/v1/system-info`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/temporal-server)
