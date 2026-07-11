# Deploy Botpress — Self-Hosted Open-Source Chatbot Builder on Railway

Self-host Botpress: visual chatbot builder with NLU & RAG. BYO LLM.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/botpress-chatbot-builder)

## About

![Botpress visual chatbot builder](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776867222/ccfe8ef1-6b77-47ed-9aa1-59f92491385d.png)

Botpress is the open-source chatbot platform — "the WordPress of conversational AI" — with a
visual flow builder, a built-in NLU engine, RAG knowledge bases, and multi-channel connectors for
web chat, Telegram, Slack, Microsoft Teams, and more. This template deploys the self-hostable
open-source Botpress server with PostgreSQL and Redis, giving you full control over your bot
logic, data, and infrastructure — no per-message platform fees and no vendor lock-in.

Botpress Cloud runs up to $189/month for higher tiers, and hosted chatbot SaaS bills per
conversation. Self-hosted Botpress on Railway costs flat compute (~$10–20/month) plus your own
LLM tokens — your conversations, knowledge bases, and user data stay on infrastructure you own.

---

Botpress is a Node.js platform backed by PostgreSQL and Redis. Running it in production means a
persistent server, a database, a Redis instance, and a public HTTPS endpoint for the chat widget
and channel webhooks. The official self-host path is Docker plus manual database and Redis wiring;
this template does that on Railway with nothing to configure by hand.

> **Which Botpress this is:** this template deploys the **self-hosted open-source Botpress
> server** — the edition you run on your own infrastructure with full data ownership. Botpress
> also offers a separate cloud product with additional managed features; the self-hosted open
> edition is MIT/AGPL-licensed at its core and is what you deploy here. Some of the newest
> cloud-only features aren't in the self-hosted edition — self-host for control, data ownership,
> and cost, not for cloud parity.

Typical cost: **~$10–20/month** on Railway for Botpress, PostgreSQL, and Redis, plus your own LLM
API usage (BYOLLM — OpenAI, Anthropic, Gemini, or local models). No per-conversation platform fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Botpress | `botpress/server:v12_31_10` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Botpress | 3000 | - |
| `BP_HOST` | Botpress | 0.0.0.0 | - |
| `BPFS_STORAGE` | Botpress | database | - |
| `BP_PRODUCTION` | Botpress | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/botpress/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/botpress-chatbot-builder)
