# Deploy Paperclip on Railway

Run an AI company with autonomous agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-2)

## About

Paperclip is a self-hosted platform for building and running AI-powered companies. Create hierarchical organizations of autonomous agents — CEOs, engineers, designers — that collaborate on tasks, delegate work, and ship real output using Claude, GPT, Codex, and other LLMs. Think of it as an operating system for AI teams.

Paperclip runs as a single Node.js server backed by PostgreSQL. The server handles the web UI, agent orchestration, task management, and all API endpoints. Agents run as child processes inside the container using pre-installed CLI tools (Claude Code, Codex, OpenCode). Hosting requires a persistent volume for agent workspaces and data, plus a Postgres database. This Railway template bundles both services — the Paperclip server and a Postgres instance — with sensible defaults. The only configuration needed is your LLM API keys, which can be added during deployment or later through the UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperclip-server | [engerlina/paperclip](https://github.com/engerlina/paperclip) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `OPENAI_API_KEY` | paperclip-server | (secret) |
| `ANTHROPIC_API_KEY` | paperclip-server | (secret) |
| `BETTER_AUTH_SECRET` | paperclip-server | (secret) |
| `POSTGRES_DB` | Postgres | paperclip |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, Shell, JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/paperclip-2)
