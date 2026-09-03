# Deploy trueforge on Railway

Hosted TrueForge: agent harness with UI, Postgres & Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trueforge-1)

## About

TrueForge is an open-source agent harness — the runtime that turns an LLM into a working agent. It runs model calls, MCP tools, skills, sandboxing, approvals, and session state, and exposes them as a chat UI, HTTP API / TypeScript SDK, and embeddable UI SDK. This template deploys hosted TrueForge with Postgres and Redis on Railway.

Hosted TrueForge runs as three Railway services: the app server (chat UI + HTTP API, built from source via `Dockerfile.dev`), Postgres for durable sessions and turns, and Redis for streaming and multi-replica coordination. `DATABASE_URL`, `REDIS_URL`, and `PUBLIC_BASE_URL` are wired automatically; Railway injects `PORT`. After deploy, generate a public domain on the `trueforge` service. Login is off by default — anyone who can reach the URL is admin — so enable OIDC before sharing beyond personal use. Redirect URI: `https:///api/v1/auth/callback`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| trueforge | [truefoundry/trueforge](https://github.com/truefoundry/trueforge) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis Host |
| `REDIS_URL` | Redis | - | Fully qualified redis url to connect to |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis |
| `POSTGRES_DB` | Postgres | - | Postgres database name |
| `DATABASE_URL` | Postgres | - | Postgres Database to connect to |
| `POSTGRES_USER` | Postgres | (secret) | Postgres user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password |
| `REDIS_URL` | trueforge | - | Redis URL to connect to |
| `STANDALONE` | trueforge | false | Keep this as false to run in server mode |
| `OIDC_SCOPES` | trueforge | - | OAuth scopes for the authorize request. |
| `DATABASE_URL` | trueforge | - | Postgres Database URL to connect to |
| `OIDC_CLIENT_ID` | trueforge | - | OIDC client ID from the IdP application. |
| `OIDC_ISSUER_URL` | trueforge | - | IdP issuer URL (discovery at /.well-known/openid-configuration). |
| `PUBLIC_BASE_URL` | trueforge | - | Base URL for Trueforge |
| `OIDC_CLIENT_SECRET` | trueforge | (secret) | OIDC client secret from the IdP application. |
| `OIDC_ALLOWED_EMAILS` | trueforge | - | Comma-separated email allowlist (exact and/or *@domain globs); empty = unrestricted. |
| `OIDC_USER_ROLE_CLAIM` | trueforge | - | ID-token claim inspected for admin membership (e.g. groups, roles, email) |
| `OIDC_ADMIN_ROLE_VALUE` | trueforge | - | Exact claim value that grants admin (case-sensitive). |
| `OIDC_USER_REFERENCE_CLAIM` | trueforge | - | ID-token claim used as the user id for session ownership (e.g. email, sub). |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Python, JavaScript, CSS, Shell, Go Template, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/trueforge-1)
