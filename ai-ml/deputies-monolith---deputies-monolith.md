# Deploy deputies-monolith on Railway

Deputies, a control plane for delegated engineering agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deputies-monolith)

## About

Deputies is a control plane for delegating engineering work to background AI agents. 

It gives each task a durable session with queued prompts, live progress, diagnostics, artifacts, and integrations for Slack, GitHub, and webhooks, so teams can run, monitor, and resume agent work across sandboxed environments.

Hosting deputies-monolith runs the Deputies API, worker loop, event stream, integrations, and Flue runner together in one service. 

The template provisions and configures Postgres for durable product state, plus object storage for artifact blobs. It boots with fake runner and sandbox defaults so the UI, auth, setup checks, database, and artifact plumbing work immediately. 

To run real agent jobs, configure model credentials, set RUNNER=flue, and choose a sandbox provider such as Daytona.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | `ghcr.io/sidpalas/deputies-web:0.17.1` | Web service |
| control-plane | `ghcr.io/sidpalas/deputies-control-plane:0.17.1` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `RUNNER` | control-plane | fake |
| `RUN_MODE` | control-plane | all |
| `API_AUTH_MODE` | control-plane | session |
| `AUTH_PROVIDER` | control-plane | static |
| `DAYTONA_IMAGE` | control-plane | ghcr.io/sidpalas/deputies-daytona-sandbox:latest |
| `APP_DATA_STORE` | control-plane | postgres |
| `DAYTONA_API_KEY` | control-plane | (secret) |
| `HIDE_SETUP_PAGE` | control-plane | false |
| `SANDBOX_PROVIDER` | control-plane | fake |
| `AUTH_COOKIE_SECURE` | control-plane | true |
| `RUNNER_STATE_STORE` | control-plane | postgres |
| `AUTH_SESSION_SECRET` | control-plane | (secret) |
| `AUTH_STATIC_PASSWORD` | control-plane | (secret) |
| `AUTH_STATIC_USERNAME` | control-plane | (secret) |
| `AUTH_COOKIE_SAME_SITE` | control-plane | lax |
| `GITHUB_WEBHOOK_SECRET` | control-plane | (secret) |
| `ARTIFACT_STORAGE_PROVIDER` | control-plane | s3 |
| `GITHUB_OAUTH_CLIENT_SECRET` | control-plane | (secret) |
| `UNSAFE_AUTH_GITHUB_ALLOW_ALL` | control-plane | false |
| `PREVIEW_TRUST_FORWARDED_HOSTS` | control-plane | false |
| `SANDBOX_SECRET_ENCRYPTION_KEY` | control-plane | (secret) |
| `SERVICE_TRUST_FORWARDED_HOSTS` | control-plane | false |
| `ARTIFACT_STORAGE_S3_FORCE_PATH_STYLE` | control-plane | true |
| `ARTIFACT_STORAGE_S3_SECRET_ACCESS_KEY` | control-plane | (secret) |
| `UNSAFE_GITHUB_WEBHOOK_ALLOW_ALL_USERS_AND_ORGS` | control-plane | false |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deputies-monolith)
