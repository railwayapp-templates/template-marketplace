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
| `PORT` | Grafana MCP | 8000 | Port the MCP HTTP server binds to inside the container. Fixed at 3000 to match what the gateway proxies to. Should match 'MCP_PORT' on the gateway. |
| `LOG_LEVEL` | Grafana MCP | info | debug | info | warn | error |
| `ACCESS_MODE` | Grafana MCP | restricted | Restricted forces read-only transactions and rejects write — safe default. Set to unrestricted only for dev/throwaway databases where writes are acceptable. |
| `GRAFANA_URL` | Grafana MCP | - | Required. Base URL of your Grafana instance. On Railway, use the private network: http://<grafana-service>.railway.internal:<port> |
| `ENABLED_TOOLS` | Grafana MCP | - | Comma-separated allowlist of tool categories, e.g. loki,prometheus. |
| `GRAFANA_PASSWORD` | Grafana MCP | (secret) | Grafana auth — set EITHER the service account token (recommended) OR both GRAFANA_USERNAME and GRAFANA_PASSWORD. |
| `GRAFANA_USERNAME` | Grafana MCP | (secret) | Grafana auth — set EITHER the service account token (recommended) OR both GRAFANA_USERNAME and GRAFANA_PASSWORD. |
| `MCP_GRAFANA_SERVER_TOKEN` | Grafana MCP | (secret) | Second auth layer — mcp-grafana requires this bearer token from callers. Must equal the gateway's MCP_SERVER_TOKEN. |
| `GRAFANA_SERVICE_ACCOUNT_TOKEN` | Grafana MCP | (secret) | Grafana auth — set EITHER the service account token (recommended) OR both GRAFANA_USERNAME and GRAFANA_PASSWORD. |
| `PORT` | Grafana MCP Gateway | 80 | Port the Gateway server listens on. Railway injects PORT. |
| `API_KEYS` | Grafana MCP Gateway | (secret) | Comma-separated list of bearer tokens allowed to call the MCP. |
| `MCP_HOST` | Grafana MCP Gateway | - | Hostname of the MCP service on Railway's private network. Defaults to mcp.railway.internal. Only override if you rename the MCP service — then set it to .railway.internal. |
| `MCP_PORT` | Grafana MCP Gateway | - | Port the MCP service listens on. Defaults to 3000, which matches the MCP service's fixed PORT. Don't change unless you also change PORT on the MCP service. |
| `PATH_KEY_AUTH` | Grafana MCP Gateway | false | `true` also accepts the key as a path segment: /k/<key>/mcp # MCP clients that cannot send an Authorization header need this. |
| `MCP_SERVER_TOKEN` | Grafana MCP Gateway | (secret) | Credential the gateway presents to the mcp service. Must equal the mcp service's MCP_GRAFANA_SERVER_TOKEN. Required if you enable PATH_KEY_AUTH alongside MCP_GRAFANA_SERVER_TOKEN. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/grafana-mcp)
