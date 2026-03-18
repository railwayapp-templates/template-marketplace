# Deploy LLMOps on Railway

Ship LLM features confidently with production-grade infrastructure.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llmops)

## About

LLMOps is a production-ready infrastructure platform for managing LLM applications at scale. It provides prompt versioning with instant rollback, request logging, cost tracking, and latency metrics—everything teams need to confidently ship LLM features from prototype to production.

Deploying LLMOps involves running a containerized application stack that orchestrates your LLM workflows. The platform consists of a web dashboard for managing prompts and configurations, an API gateway for routing LLM requests, and a data layer for storing configurations and metrics. The gateway is OpenAI API-compatible, so you can use existing OpenAI SDKs in any language—just point them to your LLMOps endpoint. LLMOps integrates with popular LLM providers (OpenAI, Anthropic, etc.). The deployment requires a PostgreSQL database for persistent storage. Railway simplifies this by provisioning all dependencies with a single click.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| llmops-build/llmops-standalone:latest | `ghcr.io/llmops-build/llmops-standalone:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/llmops)
