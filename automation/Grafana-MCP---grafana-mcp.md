# Deploy Grafana MCP on Railway

Deploy and Host Grafana MCP with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-mcp)

## About

Grafana MCP is a Model Context Protocol server that exposes a Grafana instance to LLM clients as tools — dashboards, datasources, Prometheus and Loki queries, alert rules, incidents and Sift investigations. This template deploys the MCP server behind an nginx bearer-token auth gateway, so an LLM can safely talk to your Grafana from a publicly reachable endpoint.

The MCP server itself has no notion of per-client credentials, so this template places an nginx service in front that validates every request against a comma-separated list of bearer tokens before proxying to the MCP over Railway's private network. Keys can be issued and revoked one at a time without touching the MCP service. The MCP can be pointed at any Grafana instance — a Grafana service running in the same Railway project, Grafana Cloud, or a self-hosted instance — and reaches it over `GRAFANA_URL`, so Grafana itself never has to be public either.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grafana MCP | [FournyP/grafana-mcp-railway-template](https://github.com/FournyP/grafana-mcp-railway-template) (root: mcp) | Worker |
| Grafana MCP Gateway | [FournyP/grafana-mcp-railway-template](https://github.com/FournyP/grafana-mcp-railway-template) (root: gateway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Grafana MCP | 8000 | Port the MCP server binds to. Fixed at 8000 to match MCP_PORT on the gateway. |
| `LOG_LEVEL` | Grafana MCP | info | debug | info | warn | error |
| `ACCESS_MODE` | Grafana MCP | restricted | restricted (default) passes --disable-write so no tool can create or modify dashboards, alert rules, annotations or incidents. unrestricted allows full read/write. |
| `GRAFANA_URL` | Grafana MCP | - | Base URL of your Grafana instance, e.g. http://grafana.railway.internal:3000 for a Grafana service in the same project. |
| `ENABLED_TOOLS` | Grafana MCP | - | Comma-separated allowlist of tool categories, e.g. loki,prometheus. |
| `GRAFANA_PASSWORD` | Grafana MCP | (secret) | Grafana auth — set EITHER the service account token (recommended) OR both GRAFANA_USERNAME and GRAFANA_PASSWORD. |
| `GRAFANA_USERNAME` | Grafana MCP | (secret) | Grafana auth — set EITHER the service account token (recommended) OR both GRAFANA_USERNAME and GRAFANA_PASSWORD. |
| `MCP_GRAFANA_SERVER_TOKEN` | Grafana MCP | (secret) | Second auth layer — mcp-grafana requires this bearer token from callers. Must equal the gateway's MCP_SERVER_TOKEN. |
| `GRAFANA_SERVICE_ACCOUNT_TOKEN` | Grafana MCP | (secret) | Grafana auth — set EITHER the service account token (recommended) OR both GRAFANA_USERNAME and GRAFANA_PASSWORD. |
| `PORT` | Grafana MCP Gateway | 80 | Port nginx listens on. Must match the domain's target port. |
| `API_KEYS` | Grafana MCP Gateway | (secret) | Comma-separated list of bearer tokens allowed to call the MCP. Allowed characters per key: A-Z a-z 0-9 . _ ~ + / = - |
| `MCP_HOST` | Grafana MCP Gateway | - | Hostname of the MCP service on Railway's private network. Only override if you rename the MCP service. |
| `MCP_PORT` | Grafana MCP Gateway | - | Port the MCP service listens on. Must match PORT on the MCP service. |
| `PATH_KEY_AUTH` | Grafana MCP Gateway | false | true also accepts the key as a path segment (/k/<key>/mcp) for MCP clients that cannot send an Authorization header. |
| `MCP_SERVER_TOKEN` | Grafana MCP Gateway | (secret) | Credential the gateway presents to the mcp service. Must equal the mcp service's MCP_GRAFANA_SERVER_TOKEN. Required if you enable PATH_KEY_AUTH alongside MCP_GRAFANA_SERVER_TOKEN. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/grafana-mcp)
