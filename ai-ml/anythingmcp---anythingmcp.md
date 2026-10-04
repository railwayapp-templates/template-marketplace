# Deploy anythingmcp on Railway

Turn any REST, SOAP, GraphQL, OData or SQL API into MCP tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anythingmcp)

## About

AnythingMCP is a self-hosted MCP gateway that converts REST, SOAP, GraphQL, SQL, and existing MCP services into AI-ready tools. It includes a web dashboard, connector catalog, authentication, audit logging, and dynamic MCP endpoints for Claude, ChatGPT, Copilot, Cursor, and other compatible clients.

Railway runs the pinned Docker Hub image alongside managed PostgreSQL, automatically provisions networking and TLS, and provides persistent database storage. The public domain routes to the web UI while the container keeps its backend API on the internal port 4000.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| app | `helpcodeai/anythingmcp:v0.15.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | app | 3000 |
| `NODE_ENV` | app | production |
| `JWT_SECRET` | app | (secret) |
| `MCP_API_KEY` | app | (secret) |
| `MCP_AUTH_MODE` | app | both |
| `NEXTAUTH_SECRET` | app | (secret) |
| `MCP_BEARER_TOKEN` | app | (secret) |
| `MCP_ALLOW_ANONYMOUS` | app | false |
| `ALLOW_OPEN_REGISTRATION` | app | false |
| `MCP_RATE_LIMIT_PER_MINUTE` | app | 60 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'unset PORT && exec ./start.sh'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/anythingmcp)
