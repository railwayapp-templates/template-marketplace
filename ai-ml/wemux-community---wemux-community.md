# Deploy wemux-community on Railway

Self-hostable AI agent collaboration platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wemux-community)

## About

Deploy your own Wemux control plane + Postgres on Railway in ~5 minutes. Wemux is a self-hostable AI agent platform: coding agents (Claude Code, Codex, OpenCode) execute tasks in isolated worktrees on your own machines, while the control plane coordinates projects, tasks, chat and GitHub integration.

Wemux is open source (Apache-2.0) and designed for self-hosting. This template provisions:

| Resource | Purpose |
|---|---|
| **control-plane** | Hono-based server: web console, WebSocket, task scheduling, GitHub integration, chat |
| **Postgres** | Primary database — Drizzle migrations run automatically on first boot |

The worker (the code executor) runs on **your own machines**, not in the cloud — you install it after deploy and pair it with the pairing code shown in the console. This keeps your code, credentials and execution fully under your control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| wemux-community | [wemux-ai/wemux](https://github.com/wemux-ai/wemux) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `TOKEN_SECRET` | wemux-community | (secret) |
| `BETTER_AUTH_SECRET` | wemux-community | (secret) |
| `SECRET_ENCRYPTION_KEY` | wemux-community | (secret) |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | wemux-community | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, Rust, MDX, Kotlin, CSS, HTML, Shell

[View on Railway →](https://railway.com/deploy/wemux-community)
