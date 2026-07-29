# Deploy Flowise + n8n — AI Agent Automation Stack on Railway

Self-host Flowise + n8n — AI agents & workflow automation stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-n8n-ai-automation-stack)

## About

This template deploys a complete self-hosted AI automation stack: **Flowise** for building AI agents and LLM workflows visually, and **n8n** for triggers, webhooks, and 400+ integrations — connected over a private network with a shared PostgreSQL backend. n8n handles the "when this happens, do that" automation; Flowise handles the AI reasoning. Together they build AI-powered pipelines no single tool covers alone, and this template pins both encryption keys so your saved credentials survive redeploys.

---

This stack has two services, each with an encryption key that most Flowise+n8n templates leave unpinned — and that's exactly what breaks them.

**Both encryption keys must be set and kept stable.** Flowise encrypts your stored model-provider credentials (OpenAI, Anthropic, Pinecone keys) with `FLOWISE_SECRET_KEY`, and n8n does the same with `N8N_ENCRYPTION_KEY`. If either isn't set, the service generates a random key on boot — and Flowise's own documentation warns that when that key regenerates on a later deploy, you get `Credentials could not be decrypted` and every saved credential is lost. This template pins both keys at deploy so a redeploy never invalidates your AI provider credentials. It's the single most common way the other combo templates fail.

**Both services need persistent volumes.** Flowise stores chatflows, credentials, and config in `/root/.flowise`; n8n stores workflows and its key material in `/home/node/.n8n`. Without volumes, a redeploy wipes both. Both are mounted here, and both point their data at the shared PostgreSQL for durable app state.

**The public/private split is deliberate.** n8n is exposed so external services can trigger workflows via webhook; Flowise is kept private and reached only through Railway's internal network, so your AI agent endpoints aren't open to the internet. n8n calls Flowise over the private domain.

Both are CPU services that call external LLM APIs — no GPU needed. Budget a bit more RAM than a single-service template, since you're running two Node apps plus Postgres.

Typical cost: **~$10–15/month** on Railway across the three services, plus your LLM provider usage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| FlowiseAI | `flowiseai/flowise` | Database |
| n8n | `n8nio/n8n` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `LOG_PATH` | FlowiseAI | /opt/flowise/.flowise/logs | - |
| `APIKEY_PATH` | FlowiseAI | /opt/flowise/.flowise | - |
| `DATABASE_PATH` | FlowiseAI | /opt/flowise/.flowise | - |
| `DATABASE_USER` | FlowiseAI | (secret) | - |
| `SECRETKEY_PATH` | FlowiseAI | (secret) | - |
| `DATABASE_PASSWORD` | FlowiseAI | (secret) | - |
| `OVERRIDE_DATABASE` | FlowiseAI | false | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | FlowiseAI | true | - |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_LISTEN_ADDRESS` | n8n | :: | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/opt/flowise/.flowise`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-n8n-ai-automation-stack)
