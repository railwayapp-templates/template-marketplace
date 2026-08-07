# Deploy Multica (Prebuilt) on Railway

AI coding agent issue tracker for Claude Code, Codex, Cursor and 17 more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-prebuilt)

## About

Multica is an open source issue tracker whose assignees can be AI coding
agents. File an issue, assign it to Claude Code, Codex, Cursor, Copilot CLI,
OpenCode, Qwen Code or one of a dozen more, and the agent picks up the work on
a machine you control. This template runs the project's own prebuilt images,
pinned to release v0.4.20, so a deploy takes about a minute instead of
compiling a Go server and a Next.js app from source.

Multica is three pieces: a Go API and live-updates server, a Next.js web app,
and PostgreSQL with the vector extension. This template runs each as its own
service and wires them together over Railway's private network.

The web service forwards API, sign-in, attachment and live-update traffic to
the backend internally, so your browser only ever talks to one address. That
choice is load bearing rather than cosmetic. Sign-in cookies cannot be scoped
across two separate railway.app subdomains, so the alternative layout fails
every write with a security error. Attachments are written to a disk attached
to the API service, and the database keeps its own disk, so nothing is lost
between deploys.

Everything is generated per deploy: the database password and the session
signing key are both random and unique to your instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| multica-web | `ghcr.io/multica-ai/multica-web:v0.4.20` | Web service |
| multica-api | `ghcr.io/multica-ai/multica-backend:v0.4.20` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | multica | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | multica-web | 3000 | - |
| `HOSTNAME` | multica-web | :: | - |
| `PORT` | multica-api | 8080 | - |
| `APP_ENV` | multica-api | production | - |
| `JWT_SECRET` | multica-api | (secret) | - |
| `ALLOW_SIGNUP` | multica-api | true | - |
| `ALLOWED_EMAILS` | multica-api | - | Optional. Comma separated allowlist. Set your own address here so strangers cannot sign up. |
| `RESEND_API_KEY` | multica-api | (secret) | Optional. Resend API key so sign-in codes are emailed. Leave blank to read the code from this service's logs instead. |
| `LOCAL_UPLOAD_DIR` | multica-api | /app/data/uploads | - |
| `RESEND_FROM_EMAIL` | multica-api | - | Optional. Sender address for sign-in emails, on a domain you verified with Resend. |
| `MULTICA_TRUSTED_PROXIES` | multica-api | 0.0.0.0/0,::/0 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "cd /app && exec ./entrypoint.sh"`
- **Healthcheck:** `/healthz`
- **Volume:** `/app/data/uploads`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/multica-prebuilt)
