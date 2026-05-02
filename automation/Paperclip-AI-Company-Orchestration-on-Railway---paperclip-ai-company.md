# Deploy Paperclip | AI Company Orchestration on Railway on Railway

Self Host Paperclip | Launch Your AI Company with Paperclip on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-ai-company)

## About

Paperclip is an open-source AI agent orchestration platform that lets you run entire AI-powered businesses from a single dashboard. It organises Claude Code, OpenClaw, Codex, Cursor, and any heartbeat-capable agent into a structured company — complete with org charts, goal hierarchies, per-agent budgets, governance gates, and a full audit log. 

Self-host Paperclip on Railway and get a production-ready deployment with a managed Postgres database pre-wired, persistent storage mounted at `/paperclip`, authenticated access enabled, and your public URL injected automatically — no manual configuration required.

The Paperclip service uses a custom Railway wrapper that adds a `/setup` onboarding page and a `start.mjs` entrypoint that handles database migration before the server starts.

![Paperclip Setup Page](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773763808/Paperclip_setup_page_vu1sr7.png)

Paperclip is a Node.js server with a React UI that models a business as an org chart of AI agents. It is MIT-licensed, self-hosted only (no cloud-hosted version currently exists), and requires no Paperclip account.

**Key features:**

- **Org chart orchestration** — assign CEO, CTO, engineer, and any other role to AI agents with defined reporting lines
- **Goal-aware execution** — every task carries full goal ancestry so agents know the "why", not just the title
- **Per-agent budgets** — monthly token caps enforced automatically; agents pause when they hit the limit
- **Heartbeat scheduling** — agents wake on a schedule, check their task queue, and act; event-based triggers also supported
- **Multi-company isolation** — one deployment can host dozens of companies with fully isolated data
- **Full audit trail** — every tool call, decision, and delegation logged in an append-only audit log
- **Portable company templates** — export/import orgs, agents, and skills with automatic secret scrubbing

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Paperclip | [praveen-ks-2001/paperclip-railway-template](https://github.com/praveen-ks-2001/paperclip-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Paperclip | 0.0.0.0 | Bind server to all interfaces |
| `PORT` | Paperclip | 3100 | HTTP server listening port |
| `NODE_ENV` | Paperclip | production | Application runtime environment mode |
| `DATABASE_URL` | Paperclip | - | Postgres database connection string |
| `OPENAI_API_KEY` | Paperclip | (secret) | Optional OpenAI API key for features |
| `PAPERCLIP_HOME` | Paperclip | - | Persistent storage directory path |
| `ANTHROPIC_API_KEY` | Paperclip | (secret) | Optional Anthropic API key for features |
| `BETTER_AUTH_SECRET` | Paperclip | (secret) | Secret for authentication signing |
| `PAPERCLIP_PUBLIC_URL` | Paperclip | - | Public Paperclip application URL |
| `PAPERCLIP_DEPLOYMENT_MODE` | Paperclip | authenticated | Deployment access mode configuration |
| `BETTER_AUTH_TRUSTED_ORIGINS` | Paperclip | - | Trusted origins for authentication |
| `PAPERCLIP_ALLOWED_HOSTNAMES` | Paperclip | - | Allowed hostnames for incoming requests |
| `PAPERCLIP_STORAGE_LOCAL_DIR` | Paperclip | - | Point the local directory to folder in the volume for persistence |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | Paperclip | public | Application exposure visibility setting - keep it public for elevated checks |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** HTML, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/paperclip-ai-company)
