# Deploy Paperclip on Railway

One-click persistent Paperclip on Railway with built-in setup flow.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-1)

## About

Paperclip is an open-source orchestration platform for autonomous AI companies. You define a mission, assign AI roles (CEO, CTO, engineers, marketers), and run operations through goals, tickets, heartbeats, governance controls, and budgets. It is self-hosted, MIT licensed, and designed for operating one or many AI-driven organizations from a single control plane.

Hosting Paperclip means running its control plane, persistence layer, and agent integration points in a stable production environment. In this Railway template, a setup wrapper handles onboarding, bootstrap invite flow, and secure proxying to the internal Paperclip service. You deploy with Docker, attach a Postgres database, configure auth/public URLs, and add provider API keys for the local adapters you use (OpenAI, Anthropic, Gemini, etc.). The deployment supports multi-company operation, governance workflows, and persistent state for long-running agent organizations. Health and setup endpoints are included so operators can validate readiness and onboarding status quickly after deploys or restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperclip-railway-template | [lovexbytes/paperclip-railway-template](https://github.com/lovexbytes/paperclip-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SETUP_TOKEN` | paperclip-railway-template | (secret) | - |
| `SETUP_ENABLED` | paperclip-railway-template | true | - |
| `BETTER_AUTH_SECRET` | paperclip-railway-template | (secret) | - |
| `SETUP_AUTO_BOOTSTRAP` | paperclip-railway-template | true | - |
| `PAPERCLIP_INTERNAL_PORT` | paperclip-railway-template | 3101 | - |
| `PAPERCLIP_AGENT_JWT_SECRET` | paperclip-railway-template | (secret) | - |
| `PAPERCLIP_SECRETS_MASTER_KEY` | paperclip-railway-template | (secret) | - |
| `PAPERCLIP_SECRETS_STRICT_MODE` | paperclip-railway-template | (secret) | - |
| `PAPERCLIP_ALLOWED_ATTACHMENT_TYPES` | paperclip-railway-template | * | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/paperclip-1)
