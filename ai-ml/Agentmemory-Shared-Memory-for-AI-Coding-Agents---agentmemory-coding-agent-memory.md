# Deploy Agentmemory — Shared Memory for AI Coding Agents on Railway

Self-host shared memory for Claude Code, Cursor & Codex agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentmemory-coding-agent-memory)

## About

Agentmemory is a self-hosted, persistent memory server for AI coding agents — one long-term memory backend shared across Claude Code, Cursor, Codex CLI, Cline, Goose, and other MCP-compatible tools. Instead of every session starting from zero, it remembers your project architecture, debugging history, decisions, and lessons learned, and serves them back through MCP and a REST API. This template runs it as an always-on backend so your whole toolchain shares the same project memory.

---

Agentmemory is straightforward once three specifics are understood — and each is a common "is this broken?" moment that this template preempts.

**The API lives under `/agentmemory/*`, not the root path.** Hitting the root returns nothing useful, which looks like a failure but is expected — the REST API is served under `/agentmemory/*` and is protected. Health-check the right path: `GET /agentmemory/health` with your Bearer token. Pointing a browser at the root and seeing "nothing there" is the number-one false alarm.

**`AGENTMEMORY_SECRET` protects everything — send it as a Bearer token.** The public service should expose only the authenticated REST API; the internal streams and engine stay private. Every request needs `Authorization: Bearer $AGENTMEMORY_SECRET`. Set a strong secret and keep it private — it's the key to your entire coding memory.

**The MCP shim is thin — point it at the server for the full toolset.** The published `@agentmemory/mcp` package is a lightweight shim. It exposes the full 53-tool surface only in proxy mode, when it can reach a running server via `AGENTMEMORY_URL`; with no server reachable it falls back to a 7-tool local set. So if an agent shows only 7 memory tools, it isn't pointed at this deployment — set `AGENTMEMORY_URL` to your Railway domain and the full toolkit appears.

**Compression model choice drives your cost.** Agentmemory runs background compression on observations via OpenRouter, so `OPENROUTER_MODEL` meaningfully affects monthly spend. Compression tolerates a cheaper model well, and the project warns at runtime when you pick a premium-tier one — so choose a low-cost model unless you have a reason not to.

**The `/data` volume is your memory — persist it.** All stored memory and sessions live under `/data`; this template mounts the volume so nothing is lost on redeploy. Embeddings use a current model (replacing Google's `text-embedding-004`, shut down January 2026), so it's up to date.

Typical cost: **~$5–10/month** on Railway for the service and storage, plus your OpenRouter compression usage (small with a cheap model). Agentmemory is open source and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agentmemory | [XavTo/agentmemory](https://github.com/XavTo/agentmemory) | Web service |
| agentmemory viewer caddy | [XavTo/caddy-zero-trust](https://github.com/XavTo/caddy-zero-trust) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | agentmemory | 8080 |
| `NODE_ENV` | agentmemory | production |
| `III_DATA_DIR` | agentmemory | /data |
| `AGENTMEMORY_SECRET` | agentmemory | (secret) |
| `AGENTMEMORY_DATA_DIR` | agentmemory | /data |
| `AGENTMEMORY_REQUIRE_HTTPS` | agentmemory | 1 |
| `AUTH_USER` | agentmemory viewer caddy | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, CSS, HTML

[View on Railway →](https://railway.com/deploy/agentmemory-coding-agent-memory)
