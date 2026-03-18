# Deploy Llana (Open-Source LLM Management & AI Workflow Platform) on Railway

Llana [Mar ’26] (Run, Chain & Manage AI Models Easily) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/llana)

## About

Llana is an open-source AI orchestration and workflow automation platform designed to simplify building, managing, and deploying LLM-powered applications. It acts as a bridge between large language models (like GPT, Claude, and Mistral) and real-world data, providing developers with a clean interface to manage prompts, memory, tools, and workflows. Llana enables users to prototype, test, and deploy AI agents faster - without wrestling with complex backend setups.

You can self-host Llana on Railway to run your own AI orchestration infrastructure securely and independently. Hosting Llana yourself ensures that all prompts, workflows, and API keys stay fully under your control, without relying on any external hosting provider. Railway makes this even easier by automating deployment, scaling, and updates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| llana | `juicyllama/llana:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | llana | 3000 |
| `NODE_ENV` | llana | production |
| `LOG_LEVEL` | llana | info |
| `SKIP_AUTH` | llana | true |
| `DEBUG_MODE` | llana | false |
| `USE_DATA_CACHING` | llana | READ |
| `SOFT_DELETE_COLUMN` | llana | deleted_at |
| `LLANA_DATA_CACHE_KEY` | llana | llana_cache |
| `AUTH_USER_API_KEY_NAME` | llana | (secret) |
| `CRON_EXPRESSION_CACHE_CHECK` | llana | */1 * * * * |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/llana)
