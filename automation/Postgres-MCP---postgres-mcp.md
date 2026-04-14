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
| `PORT` | Postgres MCP | 3000 | Port the MCP HTTP server binds to inside the container. Fixed at 3000 to match what the gateway proxies to. Shoul match 'MCP_PORT' on the gateway. |
| `ACCESS_MODE` | Postgres MCP | restricted | SQL-level guardrails. restricted forces read-only transactions and rejects commit/rollback — safe default. Set to unrestricted only for dev/throwaway databases where writes are acceptable. |
| `DATABASE_URI` | Postgres MCP | - | Postgres connection string the MCP will analyse. Wire this to the bundled Postgres plugin's private URL, or paste your own postgresql://user:pass@host:port/db for an external database. |
| `API_KEYS` | Postgres MCP Gateway | (secret) | Comma-separated list of bearer tokens allowed to call the MCP. |
| `MCP_HOST` | Postgres MCP Gateway | - | Hostname of the MCP service on Railway's private network. Defaults to mcp.railway.internal. Only override if you rename the MCP service — then set it to .railway.internal. |
| `MCP_PORT` | Postgres MCP Gateway | - | Port the MCP service listens on. Defaults to 3000, which matches the MCP service's fixed PORT. Don't change unless you also change PORT on the MCP service. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/postgres-mcp)
