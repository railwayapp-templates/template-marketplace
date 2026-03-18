# Deploy n8n-MCP on Railway

n8n-MCP for dev/prod use. by czlonkowski

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-mcp-2)

## About

n8n-MCP is a Model Context Protocol (MCP) server that bridges AI assistants (Claude Desktop, Claude Code, Cursor, Windsurf, Antigravity) with n8n's workflow automation platform. It provides AI models with structured access to 1,084+ n8n nodes, 2,700+ workflow templates, and real-world configuration examples—enabling AI to build, validate, and manage n8n workflows intelligently.

Railway deployment provides instant cloud hosting with zero server setup. The service runs in HTTP mode behind Railway's infrastructure, offering secure HTTPS endpoints, auto-scaling, and built-in monitoring. Authentication is handled via bearer tokens, and all traffic is encrypted by default. The single-instance design connects to one n8n instance via API credentials configured as environment variables. For multi-tenant usage, deploy separate Railway instances. The server is stateless with a read-only reference database containing node schemas, documentation, and template configurations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| czlonkowski/n8n-mcp-railway:latest | `ghcr.io/czlonkowski/n8n-mcp-railway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Listen on all interfaces |
| `MCP_MODE` | http | http |
| `N8N_MODE` | true | Enable n8n integration mode for MCP Client Tool |
| `NODE_ENV` | production | Production optimizations |
| `LOG_LEVEL` | info | Balanced logging |
| `AUTH_TOKEN` | (secret) | Generate with: openssl rand -base64 32 |
| `CORS_ORIGIN` | * | Allow any origin |
| `N8N_API_KEY` | (secret) | API key from n8n Settings → API |
| `N8N_API_URL` | REPLACE THIS.  | URL of your n8n instance (for workflow management). no slash at the end |
| `TRUST_PROXY` | 1 | Railway runs behind proxy |
| `AUTH_RATE_LIMIT_MAX` | 20 | Max auth attempts (v2.16.3+) |
| `WEBHOOK_SECURITY_MODE` | strict | SSRF protection mode (v2.16.3+) |
| `AUTH_RATE_LIMIT_WINDOW` | 900000 | Rate limit window (v2.16.3+) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/n8n-mcp-2)
