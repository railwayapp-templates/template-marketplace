# Deploy Tasuku on Railway

Self-hosted AI agent control plane for GitHub and Slack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tasuku)

## About

Tasuku is a self-hosted control plane for agentic engineering. It turns requests from GitHub, Slack, and Linear into durable workflows for research, planning, implementation, and pull-request review while keeping credentials, policy, state, and publication outside agent sandboxes.

This template deploys the combined Tasuku server and worker, PostgreSQL 18 with persistent storage, and a private Railway object-storage bucket for generated HTML artifacts. PostgreSQL, object storage, the public HTTPS origin, the master encryption key, and the bootstrap token are wired or generated automatically. Tasuku runs migrations before each deploy and serves its dashboard on the Railway-provided domain.

After deployment, open the dashboard, create the initial organization, register and install the GitHub App, then configure a remote sandbox provider and agent credentials. Daytona is the recommended sandbox provider for Railway because the platform service does not expose a host Docker socket.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tasuku | [amalshaji/tasuku](https://github.com/amalshaji/tasuku) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TASUKU_ENV` | Tasuku | production | Runtime environment. Use production for Railway deployments. |
| `DATABASE_URL` | Tasuku | - | Internal PostgreSQL connection string wired from the bundled database. |
| `TASUKU_WEB_ROOT` | Tasuku | /app/web | Directory containing the built dashboard served by Tasuku. |
| `TASUKU_LOG_LEVEL` | Tasuku | info | Structured application log level. Use info for normal operation. |
| `TASUKU_MASTER_KEY` | Tasuku | - | Generated base64 32-byte key that encrypts stored credentials and secrets. Back it up with the database. |
| `TASUKU_PUBLIC_URL` | Tasuku | - | Public HTTPS origin used for the dashboard, GitHub webhooks, setup, and OAuth callbacks. |
| `TASUKU_LISTEN_ADDRESS` | Tasuku | :8080 | Network address and port used by the Tasuku HTTP server. |
| `TASUKU_BOOTSTRAP_TOKEN` | Tasuku | (secret) | Generated token authorizing first-run organization setup and GitHub App registration. |
| `TASUKU_ARTIFACT_S3_BUCKET` | Tasuku | - | Private bucket for generated HTML artifacts, wired automatically from Railway storage. |
| `TASUKU_ARTIFACT_S3_REGION` | Tasuku | - | Signing region for the artifact bucket, wired automatically from Railway storage. |
| `TASUKU_MASTER_KEY_VERSION` | Tasuku | 1 | Positive active version recorded with values encrypted by the master key. |
| `TASUKU_ALLOW_INSECURE_HTTP` | Tasuku | false | Allows local non-production HTTP origins. Keep false for Railway HTTPS deployments. |
| `TASUKU_WORKFLOW_MAX_EVENTS` | Tasuku | 10000 | Maximum number of persisted events retained for one agent workflow. |
| `TASUKU_ARTIFACT_S3_ENDPOINT` | Tasuku | - | Server-side S3-compatible endpoint wired automatically from Railway storage. |
| `TASUKU_PREVIOUS_MASTER_KEYS` | Tasuku | {} | JSON map of prior key versions retained temporarily during master-key rotation. |
| `TASUKU_MAX_CONCURRENT_AGENTS` | Tasuku | 1 | Global concurrent agent-job limit across workers sharing this database. |
| `TASUKU_WORKER_SHUTDOWN_GRACE` | Tasuku | 2m | Time allowed for active agent jobs to finish after worker shutdown begins. |
| `TASUKU_AGENT_EXECUTION_TIMEOUT` | Tasuku | 30m | Maximum duration allowed for a single agent execution attempt. |
| `TASUKU_WORKER_FINALIZE_TIMEOUT` | Tasuku | 15s | Deadline for persisting final workflow state after an execution ends. |
| `TASUKU_WORKFLOW_MAX_EVENT_BYTES` | Tasuku | 1048576 | Maximum serialized size in bytes of one persisted workflow event. |
| `TASUKU_ARTIFACT_S3_ACCESS_KEY_ID` | Tasuku | - | Artifact bucket access-key ID wired automatically from Railway storage. |
| `TASUKU_ARTIFACT_S3_PUBLIC_ENDPOINT` | Tasuku | - | HTTPS storage origin used for short-lived signed artifact preview URLs. |
| `TASUKU_ARTIFACT_S3_FORCE_PATH_STYLE` | Tasuku | true | Uses path-style S3 URLs required by the Railway bucket endpoint. |
| `TASUKU_ARTIFACT_S3_SECRET_ACCESS_KEY` | Tasuku | (secret) | Artifact bucket secret key wired automatically from Railway storage. |
| `TASUKU_WORKFLOW_MAX_TOTAL_EVENT_BYTES` | Tasuku | 33554432 | Maximum total persisted event bytes retained for one workflow. |
| `POSTGRES_DB` | Postgres | railway | Database created when PostgreSQL initializes for the first time. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection string used by Tasuku. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser created during first initialization. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Random database password generated independently for each deployment. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public TCP-proxy connection string for administrative access. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Go, TypeScript, CSS, Shell, JavaScript, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/tasuku)
