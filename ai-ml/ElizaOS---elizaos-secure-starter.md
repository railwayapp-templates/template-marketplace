# Deploy ElizaOS on Railway

Authenticated ElizaOS agent with OpenAI and persistent pgvector memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elizaos-secure-starter)

## About

ElizaOS is an open-source agent runtime with a browser dashboard, plugin system, persistent memory, and model-provider integrations. This template pins ElizaOS core/server `1.7.2`, OpenAI plugin `1.6.0`, Bun `1.2.21`, and Caddy `2.10.2`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:0.8.1-pg17-bookworm` | Database |
| elizaos | [monotykamary/railway-template-elizaos](https://github.com/monotykamary/railway-template-elizaos) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pgvector | eliza | Database created for ElizaOS. |
| `POSTGRES_USER` | pgvector | (secret) | PostgreSQL superuser used by ElizaOS migrations. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Database password. Generated for every deployment. |
| `SECRET_SALT` | elizaos | (secret) | Salt used to encrypt ElizaOS secrets. Generated for every deployment. |
| `POSTGRES_URL` | elizaos | - | Private pgvector connection used by ElizaOS. |
| `OPENAI_API_KEY` | elizaos | (secret) | OpenAI API key used by the bundled agent. |
| `BASIC_AUTH_PASSWORD` | elizaos | (secret) | Password for the public dashboard and HTTP API. Generated for every deployment. |
| `BASIC_AUTH_USERNAME` | elizaos | (secret) | Username for the public dashboard and HTTP API. |
| `ELIZA_SERVER_AUTH_TOKEN` | elizaos | (secret) | Private ElizaOS server API token injected by the Caddy proxy. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/elizaos-secure-starter)
