# Deploy Khoj AI on Railway

Ask anything, understand documents, create new content

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/khoj-ai)

## About

[Khoj AI](https://khoj.dev/) is an open-source personal AI that allows you to chat with your knowledge base, search the web, execute code in sandboxes, and integrate with multiple AI models. It’s designed to be easily extensible, self-hostable, and privacy-conscious.

Hosting Khoj AI on [Railway](https://railway.app/) provides a simple and powerful way to deploy your own personal AI assistant in the cloud. With minimal setup, Railway takes care of the infrastructure and scaling, while you configure the services and API keys. Deploying Khoj involves setting up a Python backend, connecting to a PostgreSQL (pgvector) database, and optionally integrating external search and LLM APIs. Once deployed, you can access Khoj through your Railway public domain and manage everything from a single dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| computer | `ghcr.io/khoj-ai/khoj-computer` | Web service |
| search | `searxng/searxng` | Web service |
| sandbox | `ghcr.io/khoj-ai/terrarium` | Web service |
| server | `ghcr.io/khoj-ai/khoj-cloud:latest` | Web service |
| pgvector | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KHOJ_DEBUG` | server | False | - |
| `E2B_API_KEY` | server | (secret) | Set line below to have Khoj run code in remote E2B code sandbox instead of the self-hosted Terrarium sandbox above. Get your E2B API key from https://e2b.dev/. |
| `JINA_API_KEY` | server | (secret) | Free, Slower API. Does both web search and webpage read. Get API key from https://jina.ai/ |
| `KHOJ_NO_HTTPS` | server | - | Set True or False. Proceed with caution, especially if you are using anonymous mode |
| `POSTGRES_USER` | server | (secret) | - |
| `GEMINI_API_KEY` | server | (secret) | - |
| `OPENAI_API_KEY` | server | (secret) | - |
| `RESEND_API_KEY` | server | (secret) | - |
| `OLOSTEP_API_KEY` | server | (secret) | Paid, Fast, Higher Read Success API. Only does webpage read. Get API key from https://olostep.com/ |
| `OPENAI_BASE_URL` | server | - | Change URL to use with other OpenAI API compatible providers like VLLM, LMStudio, DeepInfra, DeepSeek etc. |
| `GUNICORN_WORKERS` | server | 3 | Default is 6. You can rollback to default configuration if you are on a pro plan. Here is the config file:https://github.com/khoj-ai/khoj/blob/master/gunicorn-config.py |
| `KHOJ_SEARXNG_URL` | server | - | Default URL of SearxNG, the default web search engine used by Khoj. |
| `ANTHROPIC_API_KEY` | server | (secret) | - |
| `FIRECRAWL_API_KEY` | server | (secret) | Paid, Fast, Open API. Only does webpage read. Get API key from https://firecrawl.dev/ |
| `POSTGRES_PASSWORD` | server | (secret) | - |
| `KHOJ_TERRARIUM_URL` | server | - | Default URL of Terrarium, the default Python sandbox used by Khoj to run code. |
| `SERPER_DEV_API_KEY` | server | (secret) | Paid, Fast API. Only does web search. Get API key from https://serper.dev/ |
| `KHOJ_ADMIN_PASSWORD` | server | (secret) | - |
| `GOOGLE_CLIENT_SECRET` | server | (secret) | - |
| `KHOJ_OPERATOR_ENABLED` | server | - | Set True to enable Khoj to use its computer |
| `KHOJ_DJANGO_SECRET_KEY` | server | (secret) | - |
| `KHOJ_TELEMETRY_DISABLE` | server | - | Uncomment the line below to disable telemetry. Telemetry helps us prioritize feature development and understand how people are using Khoj.Read more at https://docs.khoj.dev/miscellaneous/telemetry |
| `POSTGRES_DB` | pgvector | khoj | - |
| `POSTGRES_USER` | pgvector | (secret) | - |
| `PGPORT_PRIVATE` | pgvector | 5432 | - |
| `POSTGRES_PASSWORD` | pgvector | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/operator`
- **Volume:** `/etc/searxng`
- **Volume:** `/root/.khoj/`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/khoj-ai)
