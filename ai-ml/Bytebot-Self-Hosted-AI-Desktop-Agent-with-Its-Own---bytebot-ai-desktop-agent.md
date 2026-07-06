# Deploy Bytebot — Self-Hosted AI Desktop Agent with Its Own on Railway

Self-host Bytebot: an AI agent with its own full Linux desktop. Any LLM.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytebot-ai-desktop-agent)

## About

![Bytebot AI desktop agent](https://mintlify.s3.us-west-1.amazonaws.com/bytebot/images/agent-architecture.png)

Bytebot is the open-source AI desktop agent — **11k+ GitHub stars** — that gives an AI its own
full Linux computer. Unlike browser-only agents, Bytebot runs a complete Ubuntu desktop where it
can use any application, download and organize files, log into sites with a password manager,
read PDFs and spreadsheets, and complete multi-step workflows across programs. Give it a task in
plain English — "download this month's invoices from our vendor portals and organize them" — and
it opens the browser, handles 2FA, downloads the files, and files them away.

Apache-2.0 licensed and fully self-hosted. Bring your own key — Claude, GPT, Gemini, or 100+
providers via LiteLLM — and pay only for tokens. This template is maintained on an actively
kept-up fork and deploys clean on Railway for ~$10–20/month.

---

A desktop agent needs a real, persistent computer — an Ubuntu environment with a display server,
a browser, and apps the AI can install and keep across tasks. Running that by hand means Docker,
a virtual display, VNC-style streaming, a database, and secret management. It's one of the more
involved self-hosted stacks to wire up.

Railway runs the whole thing — desktop, agent, UI, and PostgreSQL over private networking, HTTPS
on the UI, and your AI key injected as a variable. The desktop is persistent: install a password
manager, log into the sites you want Bytebot to use, and that setup stays for future tasks.

> **Maintained fork:** the original Bytebot repository was archived by its author in March 2026.
> This template deploys from an actively maintained fork so deploys keep working and fixes keep
> landing — you get the tool without the abandonment risk.

Typical cost: **~$10–20/month** on Railway for the multi-service desktop stack, plus your AI
provider's per-task API fees (usually a few cents per task). No Bytebot licensing or seat fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bytebot UI | `bytebot-ai/bytebot-ui:edge` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Bytebot Agent | `bytebot-ai/bytebot-agent:edge` | Worker |
| Bytebot Desktop | `bytebot-ai/bytebot-desktop:edge` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Bytebot UI | production | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Bytebot Agent | 9991 | - |
| `GEMINI_API_KEY` | Bytebot Agent | (secret) | - |
| `OPENAI_API_KEY` | Bytebot Agent | (secret) | - |
| `ANTHROPIC_API_KEY` | Bytebot Agent | (secret) | - |
| `PORT` | Bytebot Desktop | 9990 | - |
| `DISPLAY` | Bytebot Desktop | :0 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bytebot-ai-desktop-agent)
