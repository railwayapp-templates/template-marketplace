# Deploy Vercel Workflows Chat on Railway

A Chat(Streaming) example using vercel workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vercel-workflow)

## About

Vercel Workflow is a framework for building durable applications, AI agents, and long-running backends in TypeScript. Utilizing `use workflow` and `use step` directives, it enables functions to automatically pause, resume, manage state, and retry operations across distributed systems without relying on external queues or state machines.

While Vercel natively provides a fully managed infrastructure for Workflows, deploying a self-hosted version of the open-source Workflow SDK on Railway gives you complete control over your execution environment. Hosting this on Railway involves provisioning a Node.js runtime and an associated PostgreSQL database to manage state persistence, event histories, and queueing operations securely. Railway's continuous deployment pipeline will automatically build and scale your durable functions. This setup allows your workflows to securely handle long-running background operations, event listeners, and agentic loops completely independent of standard serverless runtime timeout limits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vercel-workflow | [iqbalexperience/vercel-workflow-chat-example](https://github.com/iqbalexperience/vercel-workflow-chat-example) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| workflow-logs | [iqbalexperience/vercel-workflow-chat-example](https://github.com/iqbalexperience/vercel-workflow-chat-example) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OPENAI_API_KEY` | vercel-workflow | (secret) | Add openai apikey for chat example. |
| `WORKFLOW_TARGET_WORLD` | vercel-workflow | @workflow/world-postgres | - |
| `WORKFLOW_POSTGRES_MAX_POOL_SIZE` | vercel-workflow | 10 | - |
| `WORKFLOW_POSTGRES_WORKER_CONCURRENCY` | vercel-workflow | 10 | Adjust it according to processor count |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `WORKFLOW_TARGET_WORLD` | workflow-logs | @workflow/world-postgres | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npx workflow web --noBrowser`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/vercel-workflow)
