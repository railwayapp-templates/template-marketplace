# Deploy AI Memory Server | Shared Long-Term Memory for Coding Agents on Railway

Long-term memory and handoffs for Claude Code, Codex, OpenCode over MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-memory-server)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/ai-memory-server?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=ai-memory-server)

[ai-memory](https://github.com/akitaonrails/ai-memory) is a long-term memory server for coding agents. Claude Code, Codex, OpenCode, Gemini CLI, Cursor and others send their sessions to it over MCP and lifecycle hooks. The next session, on any machine and with any agent, starts with a handoff of where you left off and can search everything you did before. It's one Rust binary with SQLite full-text search and a git-versioned markdown wiki.

It's one service and a Railway volume.

- **Locked from the first boot.** A random bearer token is generated at deploy time. Every MCP, hook and handoff request must carry it; anything else gets a 401.
- **One server for all your machines.** Your laptop, desktop, cloud agent boxes and teammates point at the same HTTPS address, so memory follows you instead of living in one home directory.
- **Survives redeploys.** The SQLite database and the markdown wiki (with its git history) live on the volume.
- **Small.** The image is about 50 MB and the server uses about 200 MB of RAM, so it fits the Free plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AI Memory | `akitaonrails/ai-memory:3.1.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 49374 | Port Railway routes to - leave as is |
| `AI_MEMORY_AUTH_TOKEN` | (secret) | Bearer token your agents send - paste it into install-mcp/install-hooks |
| `AI_MEMORY_ALLOWED_HOSTS` | - | Hostnames the server answers to - add your custom domain here |
| `AI_MEMORY_AUTH__SECURE_COOKIE` | true | Railway serves HTTPS, so browser cookies are marked secure |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ai-memory-server)
