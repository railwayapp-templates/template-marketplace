# Deploy DB-GPT Data Assistant on Railway

Private AI data assistant with persistent metadata and vector storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/db-gpt-data-assistant)

## About

Private AI data assistant with persistent metadata and vector storage.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Two services: DB-GPT and an owner gateway. SQLite metadata, Chroma vectors, uploaded data and model caches persist below /data. This is a trusted-owner CPU deployment using external LLM/embedding APIs; GPU inference, a Docker socket and a separate execution sandbox are not provisioned. Generated ENCRYPTION_KEY must survive recovery. Provider fees are separate. MIT upstream license. Extra database connectors may need additional drivers; arbitrary connector coverage is not claimed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db-gpt | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | db-gpt | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | db-gpt | true | Owner auth for db-gpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | db-gpt | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | db-gpt | 5670 | Upstream port for db-gpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | db-gpt | (secret) | Generated access password. Keep private and preserve with backups. |
| `HF_HOME` | core | /data/cache/huggingface | Hf home for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DBGPT_LANG` | core | en | Dbgpt lang for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PUBLIC_URL` | core | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ENCRYPTION_KEY` | core | - | Generated Formbricks encryption key. Back it up securely; changing it can make encrypted data unreadable. |
| `LLM_MODEL_NAME` | core | gpt-4o | Llm model name for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENAI_API_KEY` | core | (secret) | Required model-provider API key. Provider charges are separate from Railway. |
| `OPENAI_API_BASE` | core | https://api.openai.com/v1 | Openai api base for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `EMBEDDING_MODEL_NAME` | core | text-embedding-3-small | Embedding model name for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `EMBEDDING_MODEL_API_URL` | core | https://api.openai.com/v1/embeddings | Embedding model api url for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DBGPT_MAX_PARALLEL_SUBAGENTS` | core | 1 | Dbgpt max parallel subagents for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/db-gpt-data-assistant)
