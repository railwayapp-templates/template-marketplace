# Deploy Hermes Agent with Hindsight Memory on Railway

Hermes Agent with self-hosted Hindsight memory. One OpenRouter key for both

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-with-hindsight-memory)

## About

This template runs [Hermes Agent](https://github.com/NousResearch/hermes-agent) by Nous Research with [Hindsight](https://github.com/vectorize-io/hindsight) by Vectorize as its long-term memory, both self-hosted in one Railway project. Hermes stores what you tell it in Hindsight, and Hindsight turns it into facts it can recall in later conversations. One OpenRouter key runs both.

Hermes supports Hindsight as a memory provider through a plugin that Vectorize maintains, but setting it up means installing the plugin, running Hindsight with Postgres and pgvector, and pointing one at the other. Here all of that is done on deploy. Hindsight has no public address at all; Hermes talks to it over Railway's private network with a generated key.

The deploy form asks for an OpenRouter API key. Set `MODEL` on the hermes-agent service too if you don't want Hermes's default model. When the deploy is done, use `HERMES_API_URL` and `API_SERVER_KEY` from the Variables tab of hermes-agent with any OpenAI-compatible client (the model name is `hermes-agent`), or add a Telegram bot with `TELEGRAM_BOT_TOKEN` and your user ID in `TELEGRAM_ALLOWED_USERS`.

What I tested before publishing: I told Hermes a made-up code word in one chat. Hindsight's logs showed it storing the fact in the `hermes` bank. In a second chat with no shared history, Hermes answered with the code word, and Hindsight's logs showed the recall that supplied it (0.3 seconds). Then I restarted Hermes and asked again in a new chat: same answer, again served by Hindsight.

At idle the three services used about 0.94 GB of RAM together (Hermes 392 MB, Hindsight 388 MB, Postgres 160 MB), roughly $9 a month.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| hermes-agent | `nousresearch/hermes-agent:latest` | Web service |
| hindsight-api | `ghcr.io/vectorize-io/hindsight-api:0.10.1-slim` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | hindsight | Database name |
| `DATABASE_URL` | Postgres | - | Private connection string used by Hindsight |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |
| `PORT` | hermes-agent | 8642 | Port Railway routes to and healthchecks (the API server) |
| `MODEL` | hermes-agent | - | Optional: Hermes's model, e.g. anthropic/claude-sonnet-4.6. Applied on every start; empty keeps Hermes's default (Claude Opus) |
| `API_SERVER_KEY` | hermes-agent | - | Bearer key for the API (generated). Anyone with it can use your agent |
| `HERMES_API_URL` | hermes-agent | - | Base URL for OpenAI-compatible clients (model: hermes-agent) |
| `HINDSIGHT_MODE` | hermes-agent | local_external | Use the Hindsight service in this project |
| `API_SERVER_HOST` | hermes-agent | 0.0.0.0 | Listen on all interfaces so Railway can route to it |
| `API_SERVER_PORT` | hermes-agent | 8642 | API server port |
| `HINDSIGHT_API_KEY` | hermes-agent | (secret) | Key for the Hindsight service |
| `HINDSIGHT_API_URL` | hermes-agent | - | Hindsight over the private network |
| `HINDSIGHT_BANK_ID` | hermes-agent | hermes | Memory bank Hermes reads and writes |
| `API_SERVER_ENABLED` | hermes-agent | true | OpenAI-compatible API on the public domain |
| `OPENROUTER_API_KEY` | hermes-agent | (secret) | OpenRouter API key: runs Hermes's model and Hindsight's memory (openrouter.ai/keys) |
| `TELEGRAM_BOT_TOKEN` | hermes-agent | (secret) | Optional: token from @BotFather to chat with Hermes on Telegram |
| `TELEGRAM_ALLOWED_USERS` | hermes-agent | - | Telegram user IDs allowed to use the bot, comma-separated (ask @userinfobot for yours) |
| `PORT` | hindsight-api | 8888 | Port of the Hindsight API (private network only) |
| `HINDSIGHT_API_HOST` | hindsight-api | 0.0.0.0 | Listen address |
| `HINDSIGHT_API_PORT` | hindsight-api | 8888 | API port |
| `HINDSIGHT_API_LLM_MODEL` | hindsight-api | openai/gpt-4o-mini | Model for fact extraction (cheap is fine here) |
| `HINDSIGHT_API_WORKER_ID` | hindsight-api | hindsight-railway | Stable worker id so in-flight tasks survive restarts |
| `HINDSIGHT_API_LLM_API_KEY` | hindsight-api | (secret) | Uses the OpenRouter key from the hermes-agent service |
| `HINDSIGHT_API_DATABASE_URL` | hindsight-api | - | pgvector Postgres (private network) |
| `HINDSIGHT_API_LLM_PROVIDER` | hindsight-api | openrouter | LLM that extracts facts from what Hermes stores |
| `HINDSIGHT_API_TENANT_API_KEY` | hindsight-api | (secret) | Key Hermes uses to talk to Hindsight (generated) |
| `HINDSIGHT_API_TENANT_EXTENSION` | hindsight-api | hindsight_api.extensions.builtin.tenant:ApiKeyTenantExtension | Require an API key on every request |
| `HINDSIGHT_API_RERANKER_PROVIDER` | hindsight-api | rrf | Reranker: rrf needs no model or key |
| `HINDSIGHT_API_EMBEDDINGS_PROVIDER` | hindsight-api | openrouter | Embeddings through OpenRouter |
| `HINDSIGHT_API_MIGRATION_DATABASE_URL` | hindsight-api | - | Migrations fail fast while Postgres restarts |
| `HINDSIGHT_API_EMBEDDINGS_OPENROUTER_MODEL` | hindsight-api | openai/text-embedding-3-small | Embedding model. Don't change it after memories exist |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/opt/hermes/docker/entrypoint-dispatch.sh sh -c 'if [ -n "${HINDSIGHT_API_URL:-}" ]; then if [ ! -d "${HERMES_HOME:-/opt/data}/plugins/hindsight" ]; then hermes plugins install hindsight </dev/null >/tmp/hindsight-plugin.log 2>&1 || cat /tmp/hindsight-plugin.log; fi; hermes config set memory.provider hindsight; fi; if [ -n "${MODEL:-}" ]; then hermes config set model "$MODEL"; fi; exec hermes gateway run'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Tags:** hermes, hindsight, ai-agent, memory, telegram, openai-compatible

[View on Railway →](https://railway.com/deploy/hermes-agent-with-hindsight-memory)
