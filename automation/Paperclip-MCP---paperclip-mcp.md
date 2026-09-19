# Deploy Paperclip MCP on Railway

Deploy and Host Paperclip MCP with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-mcp)

## About

Paperclip MCP is a Model Context Protocol server for the [Paperclip](https://github.com/paperclipai/paperclip) AI agent orchestration platform, built for the human operator: run your company of agents from Claude Code, Claude Desktop or any MCP client. It exposes the Paperclip REST API as 95 tools covering issues, agents, goals, projects, approvals, costs and budgets, routines, decisions, pipelines and the attention feed. This template deploys the MCP server behind an nginx bearer-token auth gateway, so an LLM can safely reach your Paperclip from a publicly reachable endpoint.

The MCP server has no client authentication of its own and binds to loopback upstream, because it is meant to sit next to your MCP client. This template places an nginx service in front that validates every request against a comma-separated list of bearer tokens before proxying to the MCP over Railway's private network. Keys can be issued and revoked one at a time without touching the MCP service. The MCP reaches Paperclip over `PAPERCLIP_API_URL`, which defaults to the private address of a service named `Paperclip` in the same project, so Paperclip itself never has to be public either.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Paperclip MCP Gateway | [FournyP/paperclip-mcp-railway-template](https://github.com/FournyP/paperclip-mcp-railway-template) (root: /gateway) | Web service |
| Paperclip MCP | [FournyP/paperclip-mcp-railway-template](https://github.com/FournyP/paperclip-mcp-railway-template) (root: /mcp) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Paperclip MCP Gateway | 80 | Port nginx listens on. Must match the domain's target port. |
| `API_KEYS` | Paperclip MCP Gateway | (secret) | Comma-separated list of bearer tokens allowed to call the MCP. Allowed characters per key: A-Z a-z 0-9 . _ ~ + / = - |
| `MCP_HOST` | Paperclip MCP Gateway | - | Hostname of the MCP service on Railway's private network. Only override if you rename the MCP service. |
| `MCP_PORT` | Paperclip MCP Gateway | - | Port the MCP service listens on. Must match PORT on the MCP service. |
| `PATH_KEY_AUTH` | Paperclip MCP Gateway | false | true also accepts the key as a path segment (/k/<key>/mcp) for MCP clients that cannot send an Authorization header. |
| `PORT` | Paperclip MCP | 8000 | Port the MCP server binds to. Fixed at 8000 to match MCP_PORT on the gateway. |
| `PAPERCLIP_RUN_ID` | Paperclip MCP | - | Forwarded as X-Paperclip-Run-Id on writes. Only ever a real heartbeat run id; a made-up UUID breaks a foreign key server-side. |
| `PAPERCLIP_API_KEY` | Paperclip MCP | (secret) | Board API key (pcp_board_...) for full operator access, or an agent API key scoped to one agent. Leave empty only for a local_trusted Paperclip. |
| `PAPERCLIP_API_URL` | Paperclip MCP | http://paperclip.railway.internal:3100 | Base URL of your Paperclip instance; /api is appended when missing. The default is the private address of a Paperclip service named "Paperclip" in the same project on its default port 3100. Also set PAPERCLIP_ALLOWED_HOSTNAMES=paperclip.railway.internal on the Paperclip service. |
| `PAPERCLIP_AGENT_ID` | Paperclip MCP | - | Default agent UUID for checkout_issue when using a board key. |
| `PAPERCLIP_COMPANY_ID` | Paperclip MCP | - | Company UUID every tool targets. It is the UUID in the Paperclip UI URL: /companies/<uuid> |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/paperclip-mcp)
