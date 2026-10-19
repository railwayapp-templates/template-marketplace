# Deploy Open WebUI + LiteLLM | Team ChatGPT with an AI Gateway on Railway

Team ChatGPT-style UI with a LiteLLM gateway for 100+ model providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-litellm)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/open-webui-litellm?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=open-webui-litellm)

[Open WebUI](https://openwebui.com/) is the self-hosted ChatGPT-style interface for teams: chats, shared prompts, document and knowledge-base search (RAG), web search, tools and per-user permissions. [LiteLLM](https://www.litellm.ai/) is an open-source AI gateway that puts OpenAI, Anthropic, Gemini, OpenRouter, Bedrock, Azure and 100+ other providers behind one OpenAI-compatible API, with virtual keys, budgets and spend tracking. This template wires them together: every model you add in LiteLLM shows up in Open WebUI for your whole team.

The stack is three services: Open WebUI, LiteLLM and Postgres.

- **Upstream images, pinned.** Open WebUI runs from `ghcr.io/open-webui/open-webui:v0.12.0` (the plain image, no bundled Ollama) and LiteLLM from `ghcr.io/berriai/litellm:v1.105.0`, its current stable release. A redeploy never pulls an untested version; upgrading is bumping the tag.
- **Wired over the private network.** Open WebUI talks to LiteLLM at its private address using LiteLLM's master key, so no model traffic leaves Railway's network between the two.
- **Models are managed in LiteLLM.** `STORE_MODEL_IN_DB` is on, so you add models, provider keys, virtual keys and budgets in the LiteLLM admin UI; they are stored in Postgres, and provider keys are encrypted with a generated salt key.
- **One Postgres, two databases.** Open WebUI keeps users, chats and settings in the `openwebui` database; LiteLLM keeps models, keys and spend logs in its own `litellm` database, created on Postgres's first boot. Both run their migrations on start.
- **Uploads on a volume.** Uploaded files, the document-search index and the small local embedding model live on Open WebUI's volume at `/app/backend/data`.
- **Every secret generated.** The LiteLLM master key and salt key, Open WebUI's session secret and the database password are generated per deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui:v0.12.0` | Web service |
| Postgres | `postgres:17.11-alpine` | Database |
| LiteLLM | `ghcr.io/berriai/litellm:v1.105.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Open WebUI | 8080 | Port Open WebUI listens on - leave as is |
| `WEBUI_URL` | Open WebUI | - | Public URL of Open WebUI (links, OAuth callbacks) - set it to your custom domain after adding one |
| `DATABASE_URL` | Open WebUI | - | Users, chats and settings live in Postgres on the private network |
| `OPENAI_API_KEY` | Open WebUI | (secret) | Key Open WebUI uses to call LiteLLM (its master key) |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) | Signs login sessions and encrypts stored OAuth tokens - changing it logs everyone out |
| `ENABLE_OLLAMA_API` | Open WebUI | False | No bundled Ollama - models come through LiteLLM |
| `OPENAI_API_BASE_URL` | Open WebUI | - | LiteLLM on the private network - every model you add in LiteLLM shows up here (only read on first boot, later edit it in Admin Settings > Connections) |
| `POSTGRES_DB` | Postgres | openwebui | Open WebUI's database (LiteLLM gets a second database, litellm, on first boot) |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `PORT` | LiteLLM | 4000 | Port LiteLLM listens on - leave as is |
| `DATABASE_URL` | LiteLLM | - | LiteLLM's own database (models, virtual keys, spend) in the shared Postgres |
| `GEMINI_API_KEY` | LiteLLM | (secret) | Optional Google AI Studio key, used by models you add in LiteLLM without their own key |
| `OPENAI_API_KEY` | LiteLLM | (secret) | Optional OpenAI key, used by models you add in LiteLLM without their own key |
| `LITELLM_SALT_KEY` | LiteLLM | - | Encrypts provider API keys stored in the database. BACK IT UP and never change it, or stored keys become unreadable |
| `ANTHROPIC_API_KEY` | LiteLLM | (secret) | Optional Anthropic key, used by models you add in LiteLLM without their own key |
| `STORE_MODEL_IN_DB` | LiteLLM | True | Add and edit models in the LiteLLM admin UI instead of a config file |
| `LITELLM_MASTER_KEY` | LiteLLM | - | Admin API key, and the password for the LiteLLM admin UI at /ui (username admin) |
| `OPENROUTER_API_KEY` | LiteLLM | (secret) | Optional OpenRouter key, used by models you add in LiteLLM without their own key |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Start command:** `/bin/sh -c "echo 'CREATE DATABASE litellm;' > /docker-entrypoint-initdb.d/10-litellm.sql && exec docker-entrypoint.sh postgres"`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/liveliness`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-litellm)
