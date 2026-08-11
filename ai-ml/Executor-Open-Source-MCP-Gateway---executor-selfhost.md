# Deploy Executor | Open Source MCP Gateway on Railway

Self-hosted MCP gateway: connect any AI agent to your APIs and tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/executor-selfhost)

## About

Executor is the open-source integration layer for AI agents: configure a tool once — an
OpenAPI spec, an MCP server, a GraphQL endpoint or a custom JS function — with its auth and
per-tool policy, then call it over MCP from any agent you use. This template runs the official
single-container self-hosted build with a persistent volume, a pre-created owner account, and
generated secrets, so it is usable the moment it finishes deploying.

Executor ships as one container that keeps everything — its libSQL/SQLite database and the
generated encryption keys — under `/data`, so there is no separate database to run. This
template mounts a Railway volume there so your catalogue, credentials and policies survive
restarts and upgrades, sets the public URL from your Railway domain automatically, and
generates the session secret and the master encryption key for you.

It also closes a gap the other self-host templates leave open. Executor's first-run setup makes
the **first visitor** the owner; on a public URL that is a race a stranger can win. This
template instead pre-creates the owner from `EXECUTOR_BOOTSTRAP_ADMIN_EMAIL` and a generated
`EXECUTOR_BOOTSTRAP_ADMIN_PASSWORD`, so the account exists before anyone can claim it. Sign in
with that email and the generated password (both visible in the service variables), then change
them from the Admin page.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Executor | `ghcr.io/usefulsoftwareco/executor-selfhost:1.5.40` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4788 | HTTP port Executor listens on. Railway routes the public domain and healthcheck here — leave as 4788. |
| `EXECUTOR_ORG_NAME` | Executor | Name of the default organization created on first boot. |
| `BETTER_AUTH_SECRET` | (secret) | Session signing secret. Generated once on deploy; changing it logs everyone out. |
| `EXECUTOR_SECRET_KEY` | (secret) | Master key that encrypts every stored integration credential. Generated once — changing it makes existing credentials unreadable. |
| `EXECUTOR_WEB_BASE_URL` | - | Public URL browsers use to reach Executor. Pre-filled from your Railway domain. |
| `EXECUTOR_BOOTSTRAP_ADMIN_NAME` | Admin | Display name for the owner account. |
| `EXECUTOR_BOOTSTRAP_ADMIN_EMAIL` | admin@example.com | Email of the pre-created owner account. Sign in with this and the generated password below, then change both in-app. |
| `EXECUTOR_BOOTSTRAP_ADMIN_PASSWORD` | (secret) | Password for the pre-created owner. Copy it from this variable after deploy, then change it in the app. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/executor-selfhost)
