# Deploy Sim — Self-Hosted Visual AI Agent Builder on Railway

Self-host Sim: visual AI agent builder. 1,000+ integrations, BYO LLM.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sim-ai-agent-builder)

## About

Sim (formerly Sim Studio) is the open-source AI workspace for building, deploying, and
orchestrating AI agents — a Figma-like visual canvas for agent workflows, backed by Y Combinator
and ~28.8k GitHub stars. Drag-and-drop blocks to wire LLMs, tools, and data into production
agents; connect 1,000+ integrations (Slack, Notion, Gmail, GitHub, Salesforce) and 15+ model
providers out of the box; and keep workflows, tables, knowledge bases, and files in one shared
workspace so your agents share memory and context.

Sim sits between n8n (more AI-native than) and LangChain/CrewAI (more visual than) — a workspace,
not just a workflow tool. Self-host on Railway for ~$10–15/month with your agents, data, and keys
on infrastructure you own, under Apache-2.0 with no per-run fees and BYO-LLM at base pricing.

---

Orchestrating multi-agent workflows in raw code turns into a mess fast — sequential, parallel, and
loop patterns are hard to maintain and impossible to see. Sim gives you a visual canvas to wire the
whole flow, then deploy it as an API or chat endpoint instead of it staying a pretty diagram.
Self-hosting keeps your workflows, data, and keys off a vendor's cloud and free from per-run pricing.

Running it needs Next.js/Bun, PostgreSQL with pgvector, and HTTPS. Railway wires the app and
database over private networking with automatic HTTPS — set your public URL and LLM keys, and
you're building agents in minutes.

> **Two things to know:** Sim's AI-assist features — Copilot and the Mothership natural-language
> control plane — are a Sim-managed cloud service; to use them self-hosted you generate a
> `COPILOT_API_KEY` at sim.ai. The visual builder, agent runtime, and integrations all work fully
> self-hosted without it. Separately, enterprise features (SSO, access control) are under a
> separate license requiring a subscription for production use.

Typical cost: **~$10–15/month** on Railway for Sim and PostgreSQL, plus your own LLM token usage
(BYOK, no markup). The managed Sim cloud is credit-based; self-hosting removes per-run credits and
keeps your data in your own database.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| realtime | `simstudioai/realtime:latest` | Worker |
| Simstudio AI | `simstudioai/simstudio:latest` | Worker |
| Migrations | `simstudioai/migrations:latest` | Worker |
| PG Vector | `pgvector/pgvector:pg17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BETTER_AUTH_SECRET` | realtime | (secret) | - |
| `RESEND_API_KEY` | Simstudio AI | (secret) | Used to configure the Resend email delivery service |
| `BETTER_AUTH_SECRET` | Simstudio AI | (secret) | - |
| `DISABLE_REGISTRATION` | Simstudio AI | false | - |
| `POSTGRES_DB` | PG Vector | railway | - |
| `POSTGRES_USER` | PG Vector | (secret) | - |
| `PGPORT_PRIVATE` | PG Vector | 5432 | - |
| `POSTGRES_PASSWORD` | PG Vector | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sim-ai-agent-builder)
