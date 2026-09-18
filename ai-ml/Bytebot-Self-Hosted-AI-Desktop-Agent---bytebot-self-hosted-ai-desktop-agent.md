# Deploy Bytebot (Self-Hosted AI Desktop Agent) on Railway

Self-hosted AI desktop agent: a Linux desktop run by Claude, GPT or Gemini

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytebot-self-hosted-ai-desktop-agent)

## About

Bytebot is an open-source AI desktop agent: a full Linux desktop (Ubuntu + XFCE, Firefox, VS Code, LibreOffice) that an LLM controls with a mouse and keyboard through natural-language tasks. Give it an instruction like "download the invoices from this portal and fill in the spreadsheet" and it clicks, types, reads the screen and finishes the job — all inside a sandboxed container you own.

Bytebot runs as four services and this template wires them together over Railway's private network. `bytebot-desktop` is the virtual desktop with a noVNC stream on port 9990. `bytebot-agent` is the NestJS brain on port 9991 that talks to your LLM provider (Anthropic, OpenAI or Gemini — set one key) and stores tasks in Postgres. `bytebot-ui` is the Next.js web app with the task list and a live view of the desktop; it is the only service with a public domain. Postgres (with a persistent volume) holds task history and messages. Everything else is pre-configured; you only need to add at least one provider API key before your first task. Expect roughly 2–4 GB of RAM for the desktop service, so this template is best on Railway's Pro plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bytebot-agent | `ghcr.io/bytebot-ai/bytebot-agent:edge` | Worker |
| bytebot-desktop | `ghcr.io/bytebot-ai/bytebot-desktop:edge` | Worker |
| bytebot-ui | `ghcr.io/bytebot-ai/bytebot-ui:edge` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | bytebot-agent | 9991 | Agent API port |
| `DATABASE_URL` | bytebot-agent | - | Postgres connection string |
| `GEMINI_API_KEY` | bytebot-agent | (secret) | Google Gemini API key. Optional if another provider is set. |
| `OPENAI_API_KEY` | bytebot-agent | (secret) | OpenAI API key (GPT). Optional if another provider is set. |
| `ANTHROPIC_API_KEY` | bytebot-agent | (secret) | Anthropic API key (Claude). Set at least one provider key. |
| `BYTEBOT_DESKTOP_BASE_URL` | bytebot-agent | - | Private URL of the desktop service |
| `PORT` | bytebot-desktop | 9990 | noVNC/websockify port used by the UI and agent |
| `DISPLAY` | bytebot-desktop | :0 | X display used by the virtual desktop |
| `NODE_ENV` | bytebot-ui | production | Run the UI in production mode |
| `BYTEBOT_AGENT_BASE_URL` | bytebot-ui | - | Private URL of the agent API |
| `BYTEBOT_DESKTOP_VNC_URL` | bytebot-ui | - | Private websockify URL for the live desktop view |
| `POSTGRES_DB` | Postgres | bytebot | Database created on first start |
| `DATABASE_URL` | Postgres | - | Private connection URL used by the agent |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated Postgres password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection URL (Data panel) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Tags:** ai-agent, computer-use, automation, rpa, bytebot, anthropic, openai, gemini

[View on Railway →](https://railway.com/deploy/bytebot-self-hosted-ai-desktop-agent)
