# Deploy Paperclip [Updated May '26] on Railway

Paperclip [May '26] (AI Agent Teams & Autonomous Companies) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-ai)

## About

Paperclip is an open-source orchestration platform for managing AI agent teams to run autonomous companies. With 67,000+ GitHub stars, it provides a single dashboard to hire AI agents, delegate tasks, approve risky decisions, and track work. It unifies multiple AI coding assistants under one control plane with org charts, budgets, governance, and audit trails.

Self-hosting Paperclip on Railway gives you full control over your AI agent infrastructure and data. Every decision, task assignment, and agent interaction stays within your own environment with no third-party access to your workflows. Railway handles PostgreSQL, persistent volumes, and SSL certificates while you focus on managing your AI-powered organization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperclip | [Shinyduo/paperclip](https://github.com/Shinyduo/paperclip) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | paperclip | 0.0.0.0 | - |
| `PORT` | paperclip | 3100 | - |
| `NODE_ENV` | paperclip | production | - |
| `SERVE_UI` | paperclip | true | - |
| `OPENAI_API_KEY` | paperclip | (secret) | You can add these later in the dashboard |
| `PAPERCLIP_HOME` | paperclip | /paperclip | - |
| `PAPERCLIP_CONFIG` | paperclip | /paperclip/instances/default/config.json | - |
| `ANTHROPIC_API_KEY` | paperclip | (secret) | You can add these later in the dashboard |
| `BETTER_AUTH_SECRET` | paperclip | (secret) | - |
| `PAPERCLIP_INSTANCE_ID` | paperclip | default | - |
| `PAPERCLIP_DEPLOYMENT_MODE` | paperclip | authenticated | - |
| `PAPERCLIP_AGENT_JWT_SECRET` | paperclip | (secret) | - |
| `PAPERCLIP_AUTH_BASE_URL_MODE` | paperclip | explicit | - |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | paperclip | public | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/paperclip-ai)
