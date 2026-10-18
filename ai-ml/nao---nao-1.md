# Deploy nao on Railway

Self-hosted analytics chat with context-aware AI insights

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nao-1)

## About

nao is an open-source analytics chat application that lets teams explore structured data and project context through natural-language conversations. It combines a Fastify backend, React web interface, Python query sidecar, DuckDB tooling, and configurable LLM providers, giving analysts a browser-based workspace for asking questions, generating insights, and sharing data-driven stories.

Railway runs the pinned upstream Docker image directly with a generated public domain and routes traffic to nao's HTTP server on port 5005. The deployment uses the bundled example project and SQLite database for a simple single-service setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `getnao/nao:0.3.24` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MODE` | prod |
| `PORT` | 5005 |
| `DB_URI` | sqlite:/app/storage/nao.db |
| `NAO_MODE` | self-hosted |
| `SERVER_PORT` | 5005 |
| `FASTAPI_PORT` | 8005 |
| `ENABLE_USER_LOGIN` | (secret) |
| `BETTER_AUTH_SECRET` | (secret) |
| `ENABLE_USER_SIGNUP` | false |
| `NAO_CONTEXT_SOURCE` | local |
| `NAO_STORAGE_BACKEND` | local |
| `DUCKDB_EXTENSION_DIR` | /app/.duckdb-extensions |
| `MCP_ACCESS_TOKEN_TTL` | (secret) |
| `MCP_REFRESH_TOKEN_TTL` | (secret) |
| `NAO_STORAGE_LOCAL_PATH` | /app/storage |
| `NAO_DEFAULT_PROJECT_PATH` | /app/example |
| `ALLOW_UNAUTHENTICATED_DCR` | true |
| `NAO_STORAGE_MAX_FILE_SIZE_MB` | 10 |

## Configuration

- **Start command:** `/entrypoint.sh`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nao-1)
