# Deploy Windmill | Open-Source Retool Alternative on Railway

Self-host Windmill. Run & automate workflows, scripts, and internal tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-automation-platform)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-automation-platform?referralCode=QXdhdr)

Deploy Windmill on Railway to get a fully self-hosted developer platform for building internal tools, workflows, and scripts. Windmill is the open-source alternative to Retool and Temporal — a code-first automation engine that turns Python, TypeScript, Go, Bash, and SQL scripts into production-ready webhooks, workflows, and UIs.

This Railway template pre-configures three services: **Windmill-Server** (API + web UI), **Windmill-Worker** (job execution engine), and **PostgreSQL** (state + job queue). Railway handles SSL, networking, and scaling — you focus on building scripts and flows.

![Windmill Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776783230/windmill-railway-architecture_khxh2i.png)

Windmill is a code-first orchestration platform built in Rust (backend) and Svelte (frontend) with 16k+ GitHub stars. It solves the problem of scattered internal scripts by providing a centralized platform where teams can write, run, schedule, and share scripts with auto-generated UIs.

Key features:
- **Multi-language support** — Python, TypeScript/JavaScript, Go, Bash, SQL, PHP, C#, Rust
- **Auto-generated UIs** — every script gets a form UI from its type signature
- **Flow builder** — visual editor for multi-step workflows with parallel branches and retries
- **13x faster than Airflow** — Rust-based job queue with sub-second scheduling
- **58+ integrations** — Google Workspace, Slack, GitHub, PostgreSQL, AWS, OpenAI, and more
- **Webhook endpoints** — turn any script into an HTTP API endpoint
- **Approval steps** — human-in-the-loop flows for sensitive operations
- **Built-in IDE** — browser-based code editor with LSP intellisense

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Windmill-Worker | `ghcr.io/windmill-labs/windmill:latest` | Worker |
| Windmill-Server | `ghcr.io/windmill-labs/windmill:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | Windmill-Worker | worker | Run as job execution worker |
| `DATABASE_URL` | Windmill-Worker | - | PostgreSQL connection string |
| `WORKER_GROUP` | Windmill-Worker | default | Worker group assignment |
| `MODE` | Windmill-Server | server | Run as API server and frontend |
| `PORT` | Windmill-Server | 8000 | HTTP listening port |
| `BASE_URL` | Windmill-Server | - | Public-facing instance URL |
| `DATABASE_URL` | Windmill-Server | - | PostgreSQL connection string |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/windmill-automation-platform)
