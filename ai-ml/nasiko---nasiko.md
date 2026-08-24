# Deploy nasiko on Railway

AI agent control plane with embedded dashboard, routing, and observability.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nasiko)

## About

Nasiko is an AI agent control plane for registering, routing, deploying, and observing agent workloads through a browser dashboard. Its Rust server embeds the frontend and exposes APIs for agent lifecycle management, model routing, MCP integrations, and secure credential storage, giving teams one focused operational console.

Railway runs the Docker image with managed networking and a generated HTTPS domain. Postgres, Redis, and RustFS provide the required platform dependencies.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/nasiko-railway:latest` | Web service |
| rustfs | `rustfs/rustfs:latest` | Worker |
| redis | `redis:7` | Database |
| postgres | `pgvector/pgvector:pg16` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | app | 8080 |
| `RUST_LOG` | app | info |
| `S3_BUCKET` | app | nasiko |
| `S3_REGION` | app | us-east-1 |
| `JWT_SECRET` | app | (secret) |
| `ADMIN_EMAIL` | app | admin@example.com |
| `OPENAI_MODEL` | app | gpt-4o-mini |
| `AGENT_RUNTIME` | app | simulated |
| `S3_ACCESS_KEY` | app | nasiko |
| `S3_SECRET_KEY` | app | (secret) |
| `ADMIN_PASSWORD` | app | (secret) |
| `ADMIN_USERNAME` | app | (secret) |
| `OPENAI_BASE_URL` | app | https://api.openai.com/v1 |
| `AGENT_JWT_SECRET` | app | (secret) |
| `SECRETS_ENCRYPTION_KEY` | app | (secret) |
| `REGISTRY_IMPORT_ALLOWED_HOSTS` | app | registry.nasiko.dev |
| `RUSTFS_ROOT_USER` | rustfs | (secret) |
| `RUSTFS_ROOT_PASSWORD` | rustfs | (secret) |
| `POSTGRES_DB` | postgres | nasiko |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nasiko)
