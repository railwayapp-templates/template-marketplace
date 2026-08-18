# Deploy WhatsApp AI Receptionist on Railway

[Aug'26] AI receptionist for WhatsApp — Evolution API + n8n, BYO LLM key

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-ai-receptionist)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-ai-receptionist)

Deploy a **complete, working AI receptionist** for your business WhatsApp number in one click — not raw API plumbing. A customer messages your number; an AI agent (Claude or GPT, using **your own API key**) answers instantly with your business context, hands off to a human on request, and sends an office-hours auto-reply when you're closed.

Built on battle-tested open source: [Evolution API](https://github.com/EvolutionAPI/evolution-api) (9.3k★) for the WhatsApp connection and [n8n](https://github.com/n8n-io/n8n) (201k★) for the agent workflow — preloaded and wired together, so it works the moment you scan a QR code.

**Who it's for:** clinics, salons, restaurants, real-estate agents, e-commerce stores, agencies — any business that gets WhatsApp messages faster than a human can answer them, and any builder who wants a self-hosted WhatsApp + AI foundation to customize.

This template deploys four services, pre-wired over Railway's private network:

| Service | Version | Role |
|---|---|---|
| **Evolution API** | `v2.3.7` (pinned by tag + sha256 digest) | WhatsApp gateway — QR pairing, send/receive, manager UI |
| **n8n** | `2.35.3` (pinned by tag + sha256 digest) | Preloaded "WhatsApp AI Receptionist" workflow (auto-imported and activated) |
| **PostgreSQL** | Railway managed | Sessions, messages, contacts + n8n data (separate schema) |
| **Redis** | Railway managed | Evolution cache — fast instance/session lookups |

Postgres, Redis, and the Evolution↔n8n webhook are never exposed publicly. WhatsApp auth lives in Postgres **and** a volume mounted at `/evolution/instances` — **it survives restarts and redeploys with no QR re-scan**. Versions are pinned by digest and bumped only through reviewed PRs, checked weekly against upstream; Evolution is deliberately kept on the v2.3.x line (v2.4.0+ requires a license activation).

**Setup (~5 minutes):**

1. Click **Deploy Now**, paste your **Anthropic (or OpenAI) API key**, your **business name**, and a short **system prompt** describing your business (services, prices, address, tone). Everything else is auto-generated.
2. Wait for the four services to go green, then open the Evolution API service's URL at `/manager` and log in with the `AUTHENTICATION_API_KEY` (under the Evolution service → Variables).
3. Create an instance (any name, e.g. `reception`), choose **Baileys**, and scan the QR code from your business phone: WhatsApp → Settings → Linked devices.
4. Send a WhatsApp message to that number from another phone. The AI answers in seconds. Done — it's live 24/7.
5. *(Optional)* Open the n8n service URL, create your owner account, and extend the receptionist workflow with any of n8n's 400+ integrations.
6. *(Optional)* Set `OFFICE_HOURS` (e.g. `09:00-18:00`) and `GENERIC_TIMEZONE` (e.g. `America/New_York`) on the n8n service for the after-hours auto-reply.

**Built-in behaviors:** instant AI answers with your business context · human handoff (customer types `human` — configurable via `HANDOFF_KEYWORD` — and the bot steps aside with a courtesy message) · office-hours auto-reply · groups and your own outgoing messages are ignored automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| n8n | [Kjudeh/whatsapp-ai-receptionist](https://github.com/Kjudeh/whatsapp-ai-receptionist) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| evolution-api | [Kjudeh/whatsapp-ai-receptionist](https://github.com/Kjudeh/whatsapp-ai-receptionist) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `DEPLOY_BUMP` | n8n | 1 | - |
| `LLM_API_KEY` | n8n | (secret) | Your Anthropic API key (console.anthropic.com) — powers the AI replies. Using OpenAI instead? Paste an OpenAI key and set LLM_PROVIDER=openai. |
| `LLM_PROVIDER` | n8n | anthropic | - |
| `N8N_PROTOCOL` | n8n | https | - |
| `OFFICE_HOURS` | n8n | 24/7 | - |
| `BUSINESS_NAME` | n8n | My Business | - |
| `SYSTEM_PROMPT` | n8n | Describe your business here: services, prices, hours, address, booking process, tone of voice. | - |
| `N8N_PROXY_HOPS` | n8n | 1 | - |
| `HANDOFF_KEYWORD` | n8n | human | - |
| `GENERIC_TIMEZONE` | n8n | UTC | - |
| `N8N_RUNNERS_MODE` | n8n | internal | - |
| `EVOLUTION_API_KEY` | n8n | (secret) | - |
| `DB_POSTGRESDB_PORT` | n8n | 5432 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_RUNNERS_ENABLED` | n8n | true | - |
| `DB_POSTGRESDB_SCHEMA` | n8n | n8n | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | - |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n | false | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `LANGUAGE` | evolution-api | en | - |
| `DEPLOY_BUMP` | evolution-api | 1 | - |
| `SERVER_PORT` | evolution-api | 8080 | - |
| `DEL_INSTANCE` | evolution-api | false | - |
| `DATABASE_ENABLED` | evolution-api | true | - |
| `DATABASE_PROVIDER` | evolution-api | postgresql | - |
| `CACHE_LOCAL_ENABLED` | evolution-api | false | - |
| `CACHE_REDIS_ENABLED` | evolution-api | true | - |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) | - |
| `CACHE_REDIS_PREFIX_KEY` | evolution-api | evolution | - |
| `WEBHOOK_GLOBAL_ENABLED` | evolution-api | true | - |
| `DATABASE_SAVE_DATA_CHATS` | evolution-api | true | - |
| `CACHE_REDIS_SAVE_INSTANCES` | evolution-api | true | - |
| `DATABASE_SAVE_DATA_CONTACTS` | evolution-api | true | - |
| `DATABASE_SAVE_DATA_INSTANCE` | evolution-api | true | - |
| `DATABASE_SAVE_MESSAGE_UPDATE` | evolution-api | true | - |
| `DATABASE_SAVE_DATA_NEW_MESSAGE` | evolution-api | true | - |
| `WEBHOOK_EVENTS_MESSAGES_UPSERT` | evolution-api | true | - |
| `DATABASE_CONNECTION_CLIENT_NAME` | evolution-api | evolution | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Volume:** `/evolution/instances`

**Category:** Bots · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/whatsapp-ai-receptionist)
