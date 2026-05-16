# Deploy Agentmemory - Self-hosted Memory for AI Agents on Railway

Persistent memory server for MCP agents. agentmemory agent memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentmemory-self-hosted-memory-for-ai-ag)

## About

Agentmemory (github : https://github.com/rohitg00/agentmemory) is a persistent memory server for AI coding agents. It stores useful project context across sessions on a Railway volume and exposes that memory through REST and MCP so tools such as OpenAI Codex CLI, Claude Code, Cursor, Cline, Goose, and other compatible agents can share the same long-term project memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agentmemory viewer caddy | [XavTo/caddy-zero-trust](https://github.com/XavTo/caddy-zero-trust) | Web service |
| agentmemory | [XavTo/agentmemory](https://github.com/XavTo/agentmemory) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_PASS` | agentmemory viewer caddy | - | Password required to access the protected web interface. |
| `AUTH_USER` | agentmemory viewer caddy | (secret) | Username required to access the protected web interface. |
| `DOMAIN_NAME` | agentmemory viewer caddy | - | Public domain name used |
| `UPSTREAM_URL` | agentmemory viewer caddy | - | Internal URL of the S3 Manager service to proxy traffic to. |
| `PORT` | agentmemory | 8080 | Public Railway port used by the Agentmemory REST API |
| `NODE_ENV` | agentmemory | production | Runs Node.js in production mode |
| `III_DATA_DIR` | agentmemory | /data | Persistent storage path used by the iii engine |
| `AGENTMEMORY_SECRET` | agentmemory | (secret) | Shared secret required for MCP and API authentication |
| `AGENTMEMORY_DATA_DIR` | agentmemory | /data | Persistent storage path used by Agentmemory |
| `PUBLIC_AGENTMEMORY_URL` | agentmemory | - | Public HTTPS URL of this Railway deployment |
| `AGENTMEMORY_REQUIRE_HTTPS` | agentmemory | 1 | Forces HTTPS-only API access in production |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** CSS, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/agentmemory-self-hosted-memory-for-ai-ag)
