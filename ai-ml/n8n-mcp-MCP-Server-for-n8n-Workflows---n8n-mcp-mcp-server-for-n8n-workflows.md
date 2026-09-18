# Deploy n8n-mcp (MCP Server for n8n Workflows) on Railway

MCP server that lets Claude, Cursor & AI agents build and run n8n workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-mcp-mcp-server-for-n8n-workflows)

## About

n8n-mcp is a Model Context Protocol (MCP) server that gives AI assistants deep knowledge of n8n. It ships with documentation, schemas and examples for 500+ n8n nodes, so Claude Desktop, Claude Code, Cursor, Windsurf or any MCP client can look up node parameters, validate configurations and — when connected to your n8n instance — create, update and run workflows for you. Stop copy-pasting JSON into n8n; describe the automation and let the agent build it correctly.

This template deploys the official Railway-optimised image `ghcr.io/czlonkowski/n8n-mcp-railway` as a single HTTP service with a public domain. It runs in `MCP_MODE=http`, protected by a generated `AUTH_TOKEN` that you paste into your MCP client. The node database is bundled in the image, so it works instantly with zero external dependencies. To enable workflow management (not just documentation), set `N8N_API_URL` to your n8n instance and `N8N_API_KEY` from n8n → Settings → API. Pair it with the n8n template on Railway and reference `https://${{n8n.RAILWAY_PUBLIC_DOMAIN}}` for a fully private setup. It is lightweight (under 256 MB RAM) and stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-mcp | `ghcr.io/czlonkowski/n8n-mcp-railway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port the MCP HTTP server listens on |
| `MCP_MODE` | http | Run as a remote HTTP MCP server |
| `LOG_LEVEL` | info | Log verbosity: debug, info, warn, error |
| `AUTH_TOKEN` | (secret) | Bearer token your MCP client must send (generated) |
| `N8N_API_KEY` | (secret) | Optional: n8n API key (Settings → API) for workflow management |
| `N8N_API_URL` | - | Optional: your n8n URL (e.g. https://n8n.example.com) to enable workflow management tools |
| `TRUST_PROXY` | 1 | Trust Railway reverse proxy headers |
| `USE_FIXED_HTTP` | true | Use the stable HTTP transport implementation |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Tags:** n8n, mcp, model-context-protocol, claude, cursor, ai-agent, automation, workflows

[View on Railway →](https://railway.com/deploy/n8n-mcp-mcp-server-for-n8n-workflows)
