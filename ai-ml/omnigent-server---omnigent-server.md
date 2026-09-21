# Deploy omnigent-server on Railway

Self-hosted control plane for AI coding agents; Postgres + admin seeded

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omnigent-server)

## About

Omnigent is an open-source control plane for AI coding agents. It keeps session
history, artifacts, accounts, the agent catalog and an MCP proxy with
server-side policy enforcement in one place, so a team shares context instead of
each person running an agent alone on a laptop. It is agent-agnostic: Claude
Code, Codex and others run under it without being rewritten.

This template deploys the Omnigent **server** together with a managed
PostgreSQL, already wired to each other, with your admin account created on
first boot.

The server is a FastAPI application backed by PostgreSQL. Three things have to
be right for a deployment to work and to stay safe, and this template handles
all three.

The database connection is injected as a Railway reference rather than a copied
connection string, so no password is ever written into the configuration.
Artifacts, bundles and uploads are kept on a persistent volume mounted at
`/data/artifacts`; without one they sit on the container's ephemeral disk and
disappear on every redeploy.

The third is less obvious. A brand-new Omnigent exposes an unauthenticated
first-run setup endpoint — it has to, or setup could not be completed. A public
instance reached before you open that form can be claimed by whoever arrives
first, and the generated hostname is not a secret: it appears in public
certificate transparency logs within minutes. This template closes the window by
creating the admin during the first boot, so by the time the URL answers, setup
is already complete.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| omnigent | `ghcr.io/omnigent-ai/omnigent-server:v0.14.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `OMNIGENT_ACCOUNTS_INIT_ADMIN_PASSWORD` | omnigent | (secret) |
| `OMNIGENT_ACCOUNTS_INIT_ADMIN_USERNAME` | omnigent | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/artifacts`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/omnigent-server)
