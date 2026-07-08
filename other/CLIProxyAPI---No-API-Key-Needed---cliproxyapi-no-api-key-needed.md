# Deploy CLIProxyAPI - No API Key Needed on Railway

OpenAI/Gemini/Claude/Codex compatible API proxy for CLI with OAuth support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cliproxyapi-no-api-key-needed)

## About

CLIProxyAPI is a powerful proxy server that exposes CLI-based AI models such as Gemini CLI, OpenAI Codex, Claude Code, Qwen Code, iFlow, and Antigravity through OpenAI-compatible APIs. It enables OAuth-based authentication, eliminating the need for API keys while providing load balancing, streaming responses, and seamless integration with popular AI coding assistants.

Deploying CLIProxyAPI on Railway provides a simple, production-ready environment for running an OAuth-powered AI proxy without managing your own infrastructure. The deployment uses the official Docker image with a persistent Railway Volume to securely store configuration files and OAuth credentials across restarts. Once deployed, you can authenticate one or more AI providers through the built-in management interface and connect your favorite AI coding tools using the generated API endpoint. Railway automatically handles networking, HTTPS, deployments, and scaling, making it easy to self-host CLIProxyAPI with minimal setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| eceasy/cli-proxy-api:latest | `eceasy/cli-proxy-api:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | eceasy/cli-proxy-api:latest | 8317 | - |
| `DEPLOY` | eceasy/cli-proxy-api:latest | cloud | - |
| `PGSQL_ENABLE` | eceasy/cli-proxy-api:latest | true | - |
| `MANAGEMENT_PASSWORD` | eceasy/cli-proxy-api:latest | (secret) | Please add your passward that will use to login |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `sh -c "cd /CLIProxyAPI && cp config.example.yaml /data/config.yaml && /CLIProxyAPI/CLIProxyAPI --config /data/config.yaml"`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cliproxyapi-no-api-key-needed)
