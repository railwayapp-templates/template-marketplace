# Deploy n8n-mcp on Railway

Deploy n8n-mcp to enable AI agents to build and edit n8n workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-mcp)

## About

n8n-mcp is a Model Context Protocol (MCP) server that bridges n8n's 525+ workflow automation nodes with AI assistants like Claude, enabling them to understand, design, build, and validate n8n workflows with deep knowledge of node properties, operations, and best practices.

🔗 **Source Code**: [github.com/czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp)

Hosting n8n-mcp involves deploying a lightweight, stateless HTTP server with a pre-built SQLite database containing comprehensive n8n node documentation. The server requires no runtime dependencies and runs in a Docker container optimized for minimal resource usage (~280MB, 82% smaller than typical n8n images). It provides Bearer token authentication for security and can optionally connect to your n8n instance API for workflow management capabilities. The deployment supports connections from various AI-powered development environments including Claude Desktop, Claude Code, Windsurf, Cursor, and VS Code.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| czlonkowski/n8n-mcp-railway:latest | `ghcr.io/czlonkowski/n8n-mcp-railway:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/n8n-mcp)
