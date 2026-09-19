# Deploy Postgres MCP on Railway

Deploy and Host Postgres MCP with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-mcp)

## About

Postgres MCP is a Model Context Protocol server that exposes a PostgreSQL database to LLM clients as tools — database health checks, query plan analysis, index tuning, and constrained SQL execution. This template deploys the MCP server behind an nginx bearer-token auth gateway, so an LLM can safely talk to your database from a publicly reachable endpoint.

The upstream project has no built-in client authentication, so this template places an nginx service in front that validates every request against a comma-separated list of bearer tokens before proxying to the MCP over Railway's private network. The MCP can be pointed at any PostgreSQL-compatible database — a Railway Postgres plugin you add to the project, a managed cloud database (Supabase, Neon, RDS), or a self-hosted instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres MCP | [FournyP/postgres-mcp-railway-template](https://github.com/FournyP/postgres-mcp-railway-template) (root: mcp) | Worker |
| Postgres MCP Gateway | [FournyP/postgres-mcp-railway-template](https://github.com/FournyP/postgres-mcp-railway-template) (root: gateway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Postgres MCP | 8000 | Port the MCP server binds to. Fixed at 8000 to match MCP_PORT on the gateway. |
| `ACCESS_MODE` | Postgres MCP | restricted | restricted (default) runs read-only transactions with execution-time limits and rejects commit/rollback. unrestricted allows full read/write; use only on dev or throwaway databases. |
| `DATABASE_URI` | Postgres MCP | - | Postgres connection string the MCP will inspect, e.g. postgresql://user:pass@host:5432/dbname. Reference a Postgres service in the same project or paste an external one. |
| `PORT` | Postgres MCP Gateway | 80 | Port nginx listens on. Must match the domain's target port. |
| `API_KEYS` | Postgres MCP Gateway | (secret) | Comma-separated list of bearer tokens allowed to call the MCP. Allowed characters per key: A-Z a-z 0-9 . _ ~ + / = - |
| `MCP_HOST` | Postgres MCP Gateway | - | Hostname of the MCP service on Railway's private network. Only override if you rename the MCP service. |
| `MCP_PORT` | Postgres MCP Gateway | - | Port the MCP service listens on. Must match PORT on the MCP service. |
| `PATH_KEY_AUTH` | Postgres MCP Gateway | false | true also accepts the key as a path segment (/k/<key>/mcp) for MCP clients that cannot send an Authorization header. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/postgres-mcp)
