# Deploy N8N MCP (@czlonkowski) on Railway

100% Working ✅ The most capable N8N MCP far beyond the native MCP server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-mcp-1)

## About

N8N MCP is a Model Context Protocol server that enables AI assistants like Claude to interact directly with n8n workflow automation instances. It bridges conversational AI with n8n's powerful automation capabilities, allowing users to search, inspect, and execute workflows through natural language commands rather than navigating the n8n interface manually.

Hosting N8N MCP requires running a containerized MCP server that connects to your existing n8n instance via its API. The deployment involves configuring environment variables for your n8n webhook URL and optional authentication credentials. The MCP server acts as a middleware layer, translating AI assistant requests into n8n API calls and returning structured responses. Railway simplifies this by handling container orchestration, networking, and environment variable management, while the Docker image includes all necessary dependencies pre-configured for immediate deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcp | `ghcr.io/czlonkowski/n8n-mcp-railway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | 🚪 HTTP server port for MCP endpoints and health checks |
| `MCP_MODE` | http | Set MCP (Model Context Protocol) communication mode to HTTP protocol for n8n integration |
| `LOG_LEVEL` | info | Set logging level to info - options:info/error/debug/warn |
| `AUTH_TOKEN` | (secret) | Reference the generated AUTH_TOKEN_KEY for API authentication across services |
| `N8N_API_URL` | https://app.n8n.cloud | n8n API endpoint URL for workflow orchestration and automation platform. Replace this with your actual N8N URL! |
| `AUTH_TOKEN_KEY` | (secret) | Generate a secure random 64-character authentication token using specified character set for API authentication |
| `AUTH_RATE_LIMIT_MAX` | 20 | Maximum number of authentication attempts allowed within the rate limit window (15 minutes) |
| `WEBHOOK_SECURITY_MODE` | strict | Enable strict webhook security mode to validate signatures and prevent unauthorized webhook triggers |
| `AUTH_RATE_LIMIT_WINDOW` | 900000 | Authentication rate limiting window in milliseconds - 900000ms equals 15 minutes for token refresh attempts |
| `DISABLE_CONSOLE_OUTPUT` | false | Disable console output in production - set to "true" if you want to suppress stdout/stderr logging |
| `SESSION_TIMEOUT_MINUTES` | 120 | - |
| `N8N_MCP_TELEMETRY_DISABLED` | true | Disable telemetry collection in n8n MCP to prevent usage data transmission to external services |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-mcp-1)
