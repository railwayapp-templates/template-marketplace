# Deploy BettaFish Research Reports on Railway

Multi-agent research and reports with PostgreSQL and persistent files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bettafish-research-reports)

## About

Multi-agent research and reports with PostgreSQL and persistent files.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 3 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bettafish | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| app | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Database |
| postgres | `postgres:15@sha256:9b1d34adbce1dd07ee6e94b4a2cf698884b89bd44a6c9c12f5da8f3acbfe4957` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | bettafish | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `ACCESS_USER` | bettafish | (secret) | Access user for bettafish. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | bettafish | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | bettafish | 5000 | Upstream port for bettafish. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | bettafish | (secret) | Generated access password. Keep private and preserve with backups. |
| `HOST` | app | 0.0.0.0 | HTTP bind address. Keep 0.0.0.0 so Railway can reach the service. |
| `PORT` | app | 5000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DB_HOST` | app | - | Db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_NAME` | app | bettafish | Db name for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_PORT` | app | 5432 | Db port for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_USER` | app | (secret) | Db user for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_DIALECT` | app | postgresql | Db dialect for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MODEL_NAME` | app | - | Required model ID supported by your provider; verify tool calling and structured output. |
| `DB_PASSWORD` | app | (secret) | Db password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MODEL_API_KEY` | app | (secret) | Required OpenAI-compatible provider API key, shared by the report engines. Provider usage is billed separately. |
| `MODEL_BASE_URL` | app | - | Required OpenAI-compatible API base URL, including /v1 where your provider requires it. |
| `TAVILY_API_KEY` | app | (secret) | Required Tavily search API key for web research; billed separately. |
| `ANSPIRE_API_KEY` | app | (secret) | Required Anspire search API key for the upstream AnspireAPI search integration. |
| `ANSPIRE_BASE_URL` | app | https://plugin.anspire.cn/api/ntsearch/search | Anspire base url for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PYTHONUNBUFFERED` | app | 1 | Pythonunbuffered for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SEARCH_TOOL_TYPE` | app | AnspireAPI | Search tool type for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `FORUM_HOST_API_KEY` | app | (secret) | Forum host api key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MINDSPIDER_API_KEY` | app | (secret) | Mindspider api key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `FORUM_HOST_BASE_URL` | app | - | Forum host base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MINDSPIDER_BASE_URL` | app | - | Mindspider base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MEDIA_ENGINE_API_KEY` | app | (secret) | Media engine api key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `QUERY_ENGINE_API_KEY` | app | (secret) | Query engine api key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `FORUM_HOST_MODEL_NAME` | app | - | Forum host model name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MEDIA_ENGINE_BASE_URL` | app | - | Media engine base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MINDSPIDER_MODEL_NAME` | app | - | Mindspider model name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `QUERY_ENGINE_BASE_URL` | app | - | Query engine base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REPORT_ENGINE_API_KEY` | app | (secret) | Report engine api key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `INSIGHT_ENGINE_API_KEY` | app | (secret) | Insight engine api key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REPORT_ENGINE_BASE_URL` | app | - | Report engine base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `INSIGHT_ENGINE_BASE_URL` | app | - | Insight engine base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MEDIA_ENGINE_MODEL_NAME` | app | - | Media engine model name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `QUERY_ENGINE_MODEL_NAME` | app | - | Query engine model name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REPORT_ENGINE_MODEL_NAME` | app | - | Report engine model name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `INSIGHT_ENGINE_MODEL_NAME` | app | - | Insight engine model name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `KEYWORD_OPTIMIZER_API_KEY` | app | (secret) | Keyword optimizer api key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `KEYWORD_OPTIMIZER_BASE_URL` | app | - | Keyword optimizer base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `KEYWORD_OPTIMIZER_MODEL_NAME` | app | - | Keyword optimizer model name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STREAMLIT_SERVER_ENABLE_FILE_WATCHER` | app | false | Streamlit server enable file watcher for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRES_DB` | postgres | bettafish | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/bettafish-research-reports)
