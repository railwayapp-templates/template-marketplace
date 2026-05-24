# Deploy Paperclip - AI Agent Company (Lite) on Railway

Open-source control plane for AI agents. Single service, embedded Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-ai-agent-company-lite)

## About

Paperclip is an open-source AI agent orchestration platform for building and running autonomous agent companies. Define roles, assign tasks, set budgets and heartbeats — and let AI agents handle the execution. Connect Claude, Gemini, or OpenAI-compatible agents to a structured org chart, task queue, and governance layer.

Paperclip requires a persistent server, a database, and a public HTTPS URL for agent heartbeats and the web UI. This template runs Paperclip as a single service using its built-in embedded PostgreSQL — no database addon required. A volume is mounted at `/paperclip` for persistent config, database files, and storage. The public Railway domain is injected at deploy time. A custom entrypoint writes the full server configuration from environment variables on first boot — no setup page, no manual config editing, no log scraping. The bootstrap admin invite URL is generated automatically and appears in the service logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperclip | [alphasecio/paperclip](https://github.com/alphasecio/paperclip) (root: /railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Paperclip host |
| `PORT` | 3100 | Paperclip port |
| `NODE_ENV` | production | Node environment |
| `DO_NOT_TRACK` | 1 | Do not track |
| `GEMINI_API_KEY` | (secret) | Gemini API key |
| `OPENAI_API_KEY` | (secret) | OpenAI API key |
| `PAPERCLIP_HOME` | /paperclip | Paperclip home dir |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key |
| `BETTER_AUTH_SECRET` | (secret) | BetterAuth secret |
| `PAPERCLIP_PUBLIC_URL` | - | Paperclip public URL |
| `PAPERCLIP_AGENT_JWT_SECRET` | (secret) | Paperclip agent JWT secret |
| `PAPERCLIP_ALLOWED_HOSTNAMES` | - | Paperclip allowed hostnames |
| `PAPERCLIP_TELEMETRY_DISABLED` | 1 | Paperclip telemetry |
| `PAPERCLIP_AUTH_DISABLE_SIGN_UP` | - | Paperclip disable signup |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/paperclip-ai-agent-company-lite)
