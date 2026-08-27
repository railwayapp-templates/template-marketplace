# Deploy Archon on Railway

Run Claude Code from a browser, behind real per-user login.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/archon)

## About

Archon is an open-source remote coding agent. It runs Claude Code on a server you control and puts a web UI in front of it, so you can start a task from a browser, watch it work, and review the pull request it opens, instead of keeping a terminal open on your laptop.

This template runs two services: Postgres and the Archon container, with a volume for cloned repositories and worktrees. Postgres is not optional here. Archon defaults to SQLite, but its per-user login is Postgres-only, so a SQLite deploy could not offer accounts at all. There are no migrations to run: the app converges its own schema on every boot under an advisory lock.

First boot is slow. The image carries bun, the Claude Code binary, the GitHub CLI and a browser-automation binary, so allow several minutes before the healthcheck passes. Signup is invite-gated by the email you supply, so the deploy is not reachable by anyone else even briefly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| archon | `ghcr.io/coleam00/archon:0.9.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | archon | Database Archon converges its schema into. |
| `DATABASE_URL` | postgres | - | Standard connection string, mirrored onto the archon service. |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser name. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres superuser password. Generated per deploy. |
| `PORT` | archon | 3000 | Port the server binds and the healthcheck probes; the two must match. |
| `GH_TOKEN` | archon | (secret) | Optional GitHub token, for cloning private repos and opening pull requests. |
| `DATABASE_URL` | archon | - | Postgres connection string. Web login requires Postgres, not the SQLite default. |
| `ARCHON_DOCKER` | archon | true | Tells Archon it is running inside a container. |
| `WEB_UI_ORIGIN` | archon | - | Browser origin allowed to call the API. Upstream defaults to *, which is unsafe here. |
| `BETTER_AUTH_URL` | archon | - | Public origin that login sessions are issued for. |
| `BETTER_AUTH_SECRET` | archon | (secret) | Signs login sessions. Generated per deploy; boot rejects anything under 32 chars. |
| `ARCHON_WEB_AUTH_HEADER` | archon | - | Randomised name for the trusted identity header, so the default cannot be forged. |
| `CLAUDE_CODE_OAUTH_TOKEN` | archon | (secret) | Token from `claude setup-token`. Archon cannot run an agent without a key. |
| `ARCHON_WEB_AUTH_REQUIRED` | archon | true | Requires a logged-in session on every /api/* request. |
| `ARCHON_AUTH_ALLOWED_EMAILS` | archon | - | Comma-separated emails allowed to register. Without one, nobody can sign up. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/.archon`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/archon)
