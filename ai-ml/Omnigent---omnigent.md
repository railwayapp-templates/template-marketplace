# Deploy Omnigent on Railway

Self-hosted AI agent meta-harness (Claude Code, Codex); admin seeded.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omnigent)

## About

Omnigent is an open-source AI agent framework and meta-harness: orchestrate Claude Code, Codex, Cursor and custom
agents from one shared web app, swap harnesses without rewriting, enforce policies, and collaborate in real time
from any device. This template deploys the Omnigent **control plane** — the server plus PostgreSQL — with your
admin account seeded and secrets generated. It is a community-maintained template and is not affiliated with the
Omnigent project.

Omnigent's server is a FastAPI/uvicorn app backed by PostgreSQL. Its built-in `accounts` auth exposes an
unauthenticated first-run setup endpoint, so a public instance reached before you create the admin can be claimed
by whoever opens it first, and it needs a database URL, a signed-cookie secret and the correct public base URL
wired up to work over HTTPS.

This template runs Omnigent on Railway with a bundled private PostgreSQL, seeds your administrator from a generated
password at first boot (so the setup endpoint is already closed when the URL goes live), keeps self-service
registration invite-only, generates the cookie secret, and wires the database, the public base URL, the port and
the health check. Agents execute on a compute backend you connect (your own machine, or a sandbox provider) — the
deployment is the orchestration and collaboration hub. Both services run from official images, pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db | `postgres:18.2-alpine3.23` | Database |
| omnigent | `ghcr.io/youssefsiam38/omnigent-railway:1.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | db | omnigent | - |
| `POSTGRES_USER` | db | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | PostgreSQL password, generated. |
| `HOST` | omnigent | 0.0.0.0 | - |
| `PORT` | omnigent | 8000 | Port Railway routes traffic and health checks to; keep it equal to the server's listen port (8000). |
| `ARTIFACT_DIR` | omnigent | /data/artifacts | - |
| `DATABASE_URL` | omnigent | - | PostgreSQL connection string the server reads. |
| `OMNIGENT_FEATURES` | omnigent | - | Comma-separated release features to enable (see the Omnigent docs); empty is all off. |
| `OMNIGENT_AUTH_PROVIDER` | omnigent | accounts | accounts is built-in multi-user auth; set oidc to use your own IdP. |
| `OMNIGENT_ACCOUNTS_BASE_URL` | omnigent | - | Public base URL for invite and magic links. |
| `OMNIGENT_ACCOUNTS_AUTO_OPEN` | omnigent | 0 | 0 keeps self-service registration invite-only; set 1 to open it. |
| `OMNIGENT_ACCOUNTS_COOKIE_SECRET` | omnigent | (secret) | Secret that signs session cookies, generated. |
| `OMNIGENT_ADMIN_CREDENTIALS_PATH` | omnigent | (secret) | - |
| `OMNIGENT_ACCOUNTS_INIT_ADMIN_PASSWORD` | omnigent | (secret) | The admin's password, generated. Copy it from here to sign in (username admin). |
| `OMNIGENT_ACCOUNTS_INIT_ADMIN_USERNAME` | omnigent | (secret) | The admin username you sign in with. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/omnigent)
