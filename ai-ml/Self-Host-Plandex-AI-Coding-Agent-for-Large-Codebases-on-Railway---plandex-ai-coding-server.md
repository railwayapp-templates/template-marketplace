# Deploy Self-Host Plandex — AI Coding Agent for Large Codebases on Railway on Railway

Self-host Plandex: 2M token context, plan version control, BYO API keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plandex-ai-coding-server)

## About

Plandex is an open-source terminal AI coding agent with **10k+ GitHub stars** built for
what other AI coding tools can't handle — large, multi-file, real-world development tasks.
**2M token context window**, tree-sitter project maps for 30+ languages, a cumulative diff
review sandbox, full plan version control with branching and rollback, and a BYO API key
model that routes through 11+ providers from a single self-hosted server.

With Plandex Cloud winding down, self-hosting on Railway is now the primary path forward —
your team's shared AI coding server, your API keys, your code, fully under your control.

---

Plandex is a client-server architecture: the CLI runs locally and the server handles plan
orchestration, multi-file context management, version control, and model routing. Running
the server in production requires PostgreSQL for metadata, a persistent volume for plan
storage, and a public HTTPS endpoint for CLI connections. Without a managed host, you're
configuring Docker Compose, PostgreSQL, SSL, and volume mounts manually.

Railway provisions all of it. This template deploys the Plandex server pre-connected to a
Railway PostgreSQL instance with a persistent plan storage volume — your team connects
immediately after deploy by pointing the CLI at your Railway domain.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the full stack. GitHub Copilot
costs $10–19/user/month. Cursor costs $20/user/month. Plandex self-hosted on Railway gives
your entire team a shared AI coding server at flat compute cost — you pay only your LLM API
usage, not a per-seat subscription.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| plandexai/plandex-server:latest | `plandexai/plandex-server:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | plandexai/plandex-server:latest | 8099 | - |
| `GOENV` | plandexai/plandex-server:latest | development | - |
| `LOCAL_MODE` | plandexai/plandex-server:latest | 1 | - |
| `PLANDEX_BASE_DIR` | plandexai/plandex-server:latest | /plandex-server | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/plandex-server`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/plandex-ai-coding-server)
