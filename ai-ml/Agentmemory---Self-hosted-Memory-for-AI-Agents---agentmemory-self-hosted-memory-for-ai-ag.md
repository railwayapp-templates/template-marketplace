# Deploy Agentmemory - Self-hosted Memory for AI Agents on Railway

Persistent memory server for MCP agents. agentmemory agent memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentmemory-self-hosted-memory-for-ai-ag)

## About

Agentmemory (github : https://github.com/rohitg00/agentmemory) is a persistent memory server for AI coding agents. It stores useful project context across sessions on a Railway volume and exposes that memory through REST and MCP so tools such as OpenAI Codex CLI, Claude Code, Cursor, Cline, Goose, and other compatible agents can share the same long-term project memory.

This Railway template pins Agentmemory 0.9.30 and iii engine/SDK 0.22.1, with noninteractive startup and a Caddy-protected viewer. It runs Agentmemory as an always-on backend for your AI coding tools. Railway provides the public HTTPS URL, runtime variables, and persistent storage volume. Agentmemory stores memory under `/data`, keeps state across redeploys, and exposes a protected REST API under `/agentmemory/*`.

The public service should expose only the REST API. Internal streams, the iii-engine port, and the optional viewer should remain private unless you intentionally protect them with a reverse proxy such as Caddy with Basic Auth.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agentmemory viewer caddy | [XavTo/caddy-zero-trust](https://github.com/XavTo/caddy-zero-trust) | Web service |
| agentmemory | [XavTo/agentmemory](https://github.com/XavTo/agentmemory) (branch: railway-0.9.30) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_PASS` | agentmemory viewer caddy | - | Password required to access the protected web interface. |
| `AUTH_USER` | agentmemory viewer caddy | (secret) | Username required to access the protected web interface. |
| `DOMAIN_NAME` | agentmemory viewer caddy | - | Public domain name used |
| `UPSTREAM_URL` | agentmemory viewer caddy | - | Private Agentmemory viewer relay, including live updates. Keep port 8083. |
| `PORT` | agentmemory | 8080 | Public Railway port used by the Agentmemory REST API |
| `NODE_ENV` | agentmemory | production | Runs Node.js in production mode |
| `III_DATA_DIR` | agentmemory | /data | Persistent storage path used by the iii engine |
| `AGENTMEMORY_SECRET` | agentmemory | (secret) | Shared secret required for MCP and API authentication |
| `AGENTMEMORY_DATA_DIR` | agentmemory | /data | Persistent storage path used by Agentmemory |
| `VIEWER_ALLOWED_HOSTS` | agentmemory | - | Trusted public hostname for the Caddy-protected viewer. Add a custom viewer hostname here when using a custom domain. |
| `PUBLIC_AGENTMEMORY_URL` | agentmemory | - | Public HTTPS URL of this Railway deployment |
| `VIEWER_ALLOWED_ORIGINS` | agentmemory | - | Exact HTTPS browser origin allowed to write through the protected viewer. Add your custom viewer origin when using a custom domain. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/agentmemory/livez`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** CSS, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/agentmemory-self-hosted-memory-for-ai-ag)
