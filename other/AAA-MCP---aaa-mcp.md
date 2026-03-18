# Deploy AAA MCP on Railway

Deploy and Host AAA MCP with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aaa-mcp)

## About

AAA MCP is a constitutional AI governance MCP server that sits between LLMs and users, enforcing 13 thermodynamic floors and VAULT‑999 auditing on every interaction. It wraps MCP‑compatible clients (Claude, GPT, Gemini, local LLMs) with reversible, law‑aware guardrails for production AI systems.

Hosting AAA MCP on Railway gives you an always‑on MCP server exposing governance tools over HTTP/STDIO for Claude Desktop, agents, or custom backends. The server runs as a containerized FastAPI/Uvicorn app while Railway manages build, deploy, HTTPS, and environment variables for your governance stack. This lets you configure API keys and modes once, then reuse the same MCP endpoint from local experiments to production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| arifOS | [ariffazil/arifOS](https://github.com/ariffazil/arifOS) | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, TypeScript, PowerShell, HTML, Shell, Batchfile, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/aaa-mcp)
