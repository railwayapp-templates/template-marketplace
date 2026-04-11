# Deploy Workflow DevKit on Railway

Self-hosted durable workflows with observability - backed by Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/workflow-devkit)

## About

[Workflow DevKit](https://useworkflow.dev) is a durable execution framework for JavaScript and TypeScript. It lets you build long-running, stateful workflows that can pause, resume, retry, and survive restarts, with built-in [observability](https://useworkflow.dev/docs/observability) for inspecting runs, steps, and events.

This template deploys a minimal self-hosted [Workflow DevKit](https://useworkflow.dev) setup on Railway using the [Postgres World](https://useworkflow.dev/docs/deploying/world/postgres-world). It runs a flight booking example app and also hosts the Workflow observability UI, both connected to the same PostgreSQL database. The template is designed as a simple starter for running workflows outside of Vercel with durable state, a long-running worker process, and a live dashboard powered by Workflow’s [observability web package](https://github.com/vercel/workflow/tree/main/packages/web).

Important: the observability UI in this template is intentionally unauthenticated for demo purposes. Anyone with the public URL can access it. For real deployments, you should keep observability private on an internal network, or fork the [`packages/web`](https://github.com/vercel/workflow/tree/main/packages/web) package from the [Workflow repository](https://github.com/vercel/workflow) and add your own authentication.

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
