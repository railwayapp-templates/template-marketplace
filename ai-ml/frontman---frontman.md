# Deploy frontman on Railway

Self-host Frontman, browser-native AI frontend agent. frontman.sh

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frontman)

## About

Frontman is an open-source AI coding agent that lives in your browser. Click any element in your running app, describe the change in plain English, and Frontman edits the actual source files with instant hot reload.

Learn more at https://frontman.sh or view the source at https://github.com/frontman-ai/frontman.

Self-hosting Frontman on Railway gives your team its own orchestration server with managed PostgreSQL, automatic HTTPS, release health checks, and database migrations before each deploy.

Frontman uses a split architecture. Your application installs a framework integration for Next.js, Astro, or Vite. That integration exposes live browser and server context through MCP tools. The Frontman server coordinates the AI agent, user accounts, task history, WebSocket sessions, OAuth, and encrypted API keys.

Railway is a good fit for teams that want self-hosted Frontman without maintaining a VM, Caddy, systemd units, PostgreSQL backups, or manual release scripts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontman | [frontman-ai/frontman](https://github.com/frontman-ai/frontman) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** ReScript, Elixir, Astro, PHP, TypeScript, Shell, HTML, JavaScript, MDX, Makefile, CSS, Dockerfile, Vue, Batchfile

[View on Railway →](https://railway.com/deploy/frontman)
