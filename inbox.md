# Deploy Inbox on Railway

Dead-simple todo manager for AI agents. SQLite + MCP, nothing else.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/inbox)

## About

Inbox is an MCP-native todo manager. There's no web UI, no REST API, no CLI — the MCP protocol is the only interface. Connect Claude, ChatGPT, or any MCP-compatible client and start managing todos. SQLite backend, OAuth 2.1 auth, one-click deploy.

Inbox runs as a single Python process with an embedded SQLite database — no external services required. The server exposes an MCP endpoint over Streamable HTTP with built-in OAuth 2.1 authentication. On first boot, a one-time setup code is printed to the deploy logs. Visit the setup URL to create your owner account, then connect any MCP client. Railway's persistent volumes keep your SQLite database intact across deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| inbox | [davidhariri/inbox](https://github.com/davidhariri/inbox) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | - |
| `SECRET_KEY` | (secret) | The secret encryption key for OAuth |
| `DATABASE_PATH` | /data/inbox.db | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/template/inbox)
