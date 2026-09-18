# Deploy MCP Atlassian on Railway

A remote MCP server for Jira & Confluence (streamable-HTTP, multi-user).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcp-atlassian)

## About

mcp-atlassian is an open-source Model Context Protocol (MCP) server for Atlassian Jira and Confluence: it exposes
your Atlassian tools to MCP clients like Claude and Cursor. This template deploys it as a remote, stateless MCP
server over HTTP, so your AI clients can reach your Atlassian tools from anywhere. It is a community-maintained
template and is not affiliated with the mcp-atlassian project or with Atlassian.

mcp-atlassian runs as a single stateless process that serves the MCP protocol over streamable-HTTP. In this
multi-user mode it holds no global Atlassian credential — instead every request must carry the caller's own
Atlassian credential in the `Authorization` header, and a request without one is rejected. That keeps the endpoint
from leaking one operator's access to another, but it also means the server must always enforce that gate when
exposed on the internet.

This template runs mcp-atlassian on Railway over streamable-HTTP in stateless mode, with the per-request
authentication gate enforced, the port and health check wired, and no secrets stored on the server. It runs the
official image unmodified, pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcp | `ghcr.io/sooperset/mcp-atlassian:0.23.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9000 | Port the server listens on; keep it equal to the public target port (9000). |
| `JIRA_URL` | - | Your Jira base URL (e.g. https://your-company.atlassian.net). Needed for Server/Data Center + PAT. |
| `STATELESS` | true | true keeps no session state between requests; each request carries its own Atlassian credential. |
| `TRANSPORT` | streamable-http | MCP transport; streamable-http serves the /mcp endpoint over HTTP. |
| `CONFLUENCE_URL` | - | Your Confluence base URL (e.g. https://your-company.atlassian.net/wiki). |
| `READ_ONLY_MODE` | - | Set to true to expose only read tools (recommended for a shared, exploratory endpoint). |
| `ATLASSIAN_OAUTH_ENABLE` | - | Set to true to accept per-user Atlassian Cloud OAuth 2.0 access tokens. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mcp-atlassian)
