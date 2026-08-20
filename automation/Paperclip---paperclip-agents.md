# Deploy Paperclip on Railway

App for managing teams of AI agents that do real work

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-agents)

## About

Paperclip is an open-source control plane for running teams of AI agents at work. It looks like a task manager, but underneath is the scaffolding an organisation of agents needs: an org chart with roles and reporting lines, tickets carrying goal context, heartbeats that wake agents on a schedule, per-agent budgets that stop runaway spend, and approval gates before anything ships. Agents are yours to bring — Claude Code, Codex, Cursor, Gemini, OpenCode, bash, or any HTTP webhook.

Self-host Paperclip on Railway and you get the full server, not a trimmed demo. This template runs the Node.js API and React interface as one service in front of managed PostgreSQL, with a Railway object storage bucket for attachments and the artifacts agents produce. Tasks, org structure, run history and cost events live in Postgres, and a persistent volume keeps instance config, execution workspaces and backups across redeploys. The image comes from `ghcr.io/paperclipai/paperclip` with a thin startup wrapper handling first-admin setup.

![Diagram of the Paperclip and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787156978/paperclip-architecture.png)

Anyone running more than a couple of coding agents hits the same wall: a dozen terminal tabs, no record of who is doing what, no budget ceiling, and every context reset losing the thread. Paperclip replaces that with a durable system of record — work is ticket-based and agent sessions survive restarts, because their state lives in Postgres.

- **Bring your own agent** — Claude Code, Codex, Cursor, Gemini, OpenCode, bash and webhook adapters
- **Goal alignment** — every task carries its goal ancestry, so agents see the "why", not just a title
- **Heartbeats** — agents wake on a schedule, pick up work, and delegate across the org chart
- **Cost control** — token and spend tracking per agent, project and model, with hard stops
- **Governance** — approval gates, revisioned config, and pause, resume or terminate on any agent

The architecture is deliberately small. The Paperclip service runs the API and compiled interface in one Node.js process, so there is a single origin and no cross-domain cookie problems. PostgreSQL is the system of record, the bucket holds attachments and work products, and the volume at `/paperclip` carries instance config, agent workspaces and backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperclip | [gridalpha/paperclip-railway](https://github.com/gridalpha/paperclip-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | paperclip | railway | Database created on first boot |
| `DATABASE_URL` | paperclip | - | Private connection string |
| `POSTGRES_USER` | paperclip | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | paperclip | (secret) | Superuser password |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/paperclip-agents)
