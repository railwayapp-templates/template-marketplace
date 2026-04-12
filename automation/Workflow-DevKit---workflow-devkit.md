# Deploy Workflow DevKit on Railway

Self-hosted durable workflows with observability - backed by Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/workflow-devkit)

## About

[Workflow DevKit](https://useworkflow.dev) is a durable execution framework for JavaScript and TypeScript. It lets you build long-running, stateful workflows that can pause, resume, retry, and survive restarts, with built-in [observability](https://useworkflow.dev/docs/observability) for inspecting runs, steps, and events.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| database | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| app | [vercel/workflow-examples](https://github.com/vercel/workflow-examples) (root: /postgres) | Web service |
| observability | [vercel/workflow-examples](https://github.com/vercel/workflow-examples) (root: /postgres) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | database | railway | Default database created when image is started. |
| `DATABASE_URL` | database | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | database | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | database | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | database | - | Public URL to connect to Postgres database, used by the Data panel. |
| `WORKFLOW_POSTGRES_URL` | app | - | Database URL |
| `WORKFLOW_TARGET_WORLD` | app | @workflow/world-postgres | Set the workflow world |
| `WORKFLOW_POSTGRES_URL` | observability | - | Database URL |
| `WORKFLOW_TARGET_WORLD` | observability | @workflow/world-postgres | Set the workflow world |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bunx workflow web --noBrowser`

**Category:** Automation · **Languages:** TypeScript, CSS, JavaScript, HTML, Svelte, Astro, Vue

[View on Railway →](https://railway.com/deploy/workflow-devkit)
