# Deploy Paperclip — AI Agent Company OS on Railway on Railway

Self-host Paperclip: org charts, goals & budgets for your AI agent team.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-ai-agent)

## About

Paperclip is the open-source platform for running a company with AI agents. Not just another
agent tool — Paperclip gives your AI team an org chart, goals, budgets, heartbeats, ticketing,
and governance so agents like Claude, Codex, and OpenClaw operate as managed employees, not
one-off prompts. If OpenClaw is an employee, Paperclip is the company.

This template deploys a fully configured Paperclip instance with managed PostgreSQL and
persistent volume storage — browser-based setup at `/setup`, no SSH, no DevOps required.

---

Running Paperclip in production requires a persistent PostgreSQL database for auth and agent
state, a mounted volume for runtime data, a public HTTPS endpoint for the browser UI and agent
webhooks, and secure credential management for your LLM provider API keys. Without a managed
host, you're configuring Docker, networking, SSL, and volume mounts manually.

Railway handles all of it. This template provisions Paperclip alongside managed PostgreSQL,
mounts a persistent volume at `/paperclip`, and exposes your instance at a public HTTPS Railway
domain automatically. The browser-based `/setup` wizard generates your first admin invite and
authenticates your chosen LLM providers — no log scraping, no SSH access needed.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the full stack. Paperclip itself
is free and open-source — you pay only for Railway compute and your LLM provider API usage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| paperclip-ai | [sahilrupani/paperclip-ai](https://github.com/sahilrupani/paperclip-ai) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | paperclip-ai | 0.0.0.0 | Bind host for container runtime. |
| `PORT` | paperclip-ai | 3100 | Internal app port exposed by container. |
| `SERVE_UI` | paperclip-ai | true | Enables serving Paperclip UI from the app service. |
| `DATABASE_URL` | paperclip-ai | - | Primary Postgres connection string from Railway managed postgres service. |
| `OPENAI_API_KEY` | paperclip-ai | (secret) | OpenAI API key |
| `PAPERCLIP_HOME` | paperclip-ai | /paperclip | Persistent filesystem root for Paperclip app state/config. |
| `ANTHROPIC_API_KEY` | paperclip-ai | (secret) | Anthropic API key |
| `BETTER_AUTH_SECRET` | paperclip-ai | (secret) | Authentication/session signing secret for Better Auth |
| `BETTER_AUTH_BASE_URL` | paperclip-ai | - | Canonical public URL used by Better Auth for callback and redirect URLs |
| `PAPERCLIP_PUBLIC_URL` | paperclip-ai | - | Public base URL used by Paperclip for callbacks/links. |
| `PAPERCLIP_DEPLOYMENT_MODE` | paperclip-ai | authenticated | Deployment mode; authenticated requires login/auth flow. |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | paperclip-ai | private | Exposure model for deployment; private is recommended default. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/paperclip-ai-agent)
