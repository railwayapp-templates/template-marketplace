# Deploy AI Agentic Automation Stack (n8n) on Railway

All-in-One AI Automation Stack: workflows, agents, vector DB, web scraping

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ai-agentic-automation-stack-n8n)

## About

The AI Agentic Automation Stack combines n8n workflow automation, creating a complete enterprise-grade automation platform. This self-hosted solution includes vector databases, intelligent web scraping, private search, and coordinated AI agents that work together to handle complex business processes with 10K+ concurrent executions.

Hosting this stack involves deploying 9 interconnected services: n8n main orchestrator with distributed workers, n8n main platform with specialized workers for multi-agent coordination, Qdrant vector database for semantic search and RAG capabilities, SearXNG for private web research, Crawl4AI for intelligent content extraction, Redis for high-performance caching, and PostgreSQL for robust data persistence. Each service is containerized and automatically configured with proper networking, volumes, and environment variables for seamless operation at enterprise scale.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Main | `n8nio/n8n` | Web service |
| Worker | `n8nio/n8n` | Database |
| Qdrant | `qdrant/qdrant` | Database |
| SearXNG | [protemplate/searxng](https://github.com/protemplate/searxng) | Web service |
| WebhookProcessor | `n8nio/n8n` | Web service |
| Crawl4AI | `unclecode/crawl4ai:latest` | Web service |
| Postgis | `ghcr.io/railwayapp-templates/timescale-postgis-ssl:pg17-ts2.17` | Database |
| Redis | `bitnamilegacy/redis:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Main | 5678 | The application's HTTP port |
| `DB_TYPE` | Main | postgresdb | Database type |
| `WEBHOOK_URL` | Main | - | Manual Webhook URL configuration was required for n8n behind a reverse proxy |
| `NODE_OPTIONS` | Main | --max_old_space_size=8192 | Task runner Node.js process memory limit. |
| `EXECUTIONS_MODE` | Main | queue | Should executions be direct or queued? |
| `DB_POSTGRESDB_HOST` | Main | - | Database host |
| `DB_POSTGRESDB_PORT` | Main | - | Database port |
| `DB_POSTGRESDB_USER` | Main | (secret) | Database username |
| `N8N_ENCRYPTION_KEY` | Main | - | Generates a secure random 32-character string |
| `N8N_LISTEN_ADDRESS` | Main | :: | n8n's listening IP address |
| `N8N_EDITOR_BASE_URL` | Main | - | Public editor URL |
| `N8N_RUNNERS_ENABLED` | Main | true | Are task runners running? |
| `QUEUE_BULL_REDIS_HOST` | Main | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | Main | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | Main | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | Main | (secret) | Database password |
| `QUEUE_BULL_REDIS_PASSWORD` | Main | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | Main | (secret) | Redis username |
| `QUEUE_BULL_REDIS_DUALSTACK` | Main | true | Configure Redis connections for dual-stack (IPv4/IPv6). |
| `N8N_BINARY_DATA_STORAGE_PATH` | Main | /n8n-binary-data | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | Main | filesystem | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Main | true | Enable alpine private networking |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | Main | true | Disable the webhook process in the main process |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Main | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Main | true | - |
| `PORT` | Worker | 5678 | The application's HTTP port |
| `DB_TYPE` | Worker | postgresdb | Database type |
| `WEBHOOK_URL` | Worker | - | Manual Webhook URL configuration was required for n8n behind a reverse proxy |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | Task runner Node.js process memory limit. |
| `EXECUTIONS_MODE` | Worker | queue | Should executions be direct or queued? |
| `DB_POSTGRESDB_HOST` | Worker | - | Database host |
| `DB_POSTGRESDB_PORT` | Worker | - | Database port |
| `DB_POSTGRESDB_USER` | Worker | (secret) | Database username |
| `N8N_ENCRYPTION_KEY` | Worker | - | Generates a secure random 32-character string |
| `N8N_LISTEN_ADDRESS` | Worker | :: | n8n's listening IP address |
| `N8N_RUNNERS_ENABLED` | Worker | true | Are task runners running? |
| `QUEUE_BULL_REDIS_HOST` | Worker | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | Worker | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | Worker | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | Database password |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | Redis username |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | Configure Redis connections for dual-stack (IPv4/IPv6). |
| `N8N_BINARY_DATA_STORAGE_PATH` | Worker | /n8n-binary-data | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | Worker | filesystem | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Enable alpine private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | - |
| `QDRANT__SERVICE__HOST` | Qdrant | :: | - |
| `PORT` | SearXNG | 8080 | - |
| `SEARXNG_SECRET_KEY` | SearXNG | (secret) | - |
| `SEARXNG_UWSGI_THREADS` | SearXNG | 4 | - |
| `SEARXNG_UWSGI_WORKERS` | SearXNG | 4 | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | SearXNG | true | - |
| `PORT` | WebhookProcessor | 5678 | The application's HTTP port |
| `DB_TYPE` | WebhookProcessor | postgresdb | Database type |
| `WEBHOOK_URL` | WebhookProcessor | - | Manual Webhook URL configuration was required for n8n behind a reverse proxy |
| `NODE_OPTIONS` | WebhookProcessor | --max_old_space_size=8192 | Task runner Node.js process memory limit. |
| `EXECUTIONS_MODE` | WebhookProcessor | queue | Should executions be direct or queued? |
| `DB_POSTGRESDB_HOST` | WebhookProcessor | - | Database host |
| `DB_POSTGRESDB_PORT` | WebhookProcessor | - | Database port |
| `DB_POSTGRESDB_USER` | WebhookProcessor | (secret) | Database username |
| `N8N_ENCRYPTION_KEY` | WebhookProcessor | - | Generates a secure random 32-character string |
| `N8N_LISTEN_ADDRESS` | WebhookProcessor | :: | n8n's listening IP address |
| `N8N_RUNNERS_ENABLED` | WebhookProcessor | true | Are task runners running? |
| `QUEUE_BULL_REDIS_HOST` | WebhookProcessor | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | WebhookProcessor | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | WebhookProcessor | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | WebhookProcessor | (secret) | Database password |
| `QUEUE_BULL_REDIS_PASSWORD` | WebhookProcessor | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | WebhookProcessor | (secret) | Redis username |
| `QUEUE_BULL_REDIS_DUALSTACK` | WebhookProcessor | true | Configure Redis connections for dual-stack (IPv4/IPv6). |
| `N8N_BINARY_DATA_STORAGE_PATH` | WebhookProcessor | /n8n-binary-data | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | WebhookProcessor | filesystem | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | WebhookProcessor | true | Enable alpine private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | WebhookProcessor | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | WebhookProcessor | true | - |
| `PORT` | Crawl4AI | 11235 | - |
| `GROQ_API_KEY` | Crawl4AI | (secret) | - |
| `OPENAI_API_KEY` | Crawl4AI | (secret) | - |
| `MISTRAL_API_KEY` | Crawl4AI | (secret) | - |
| `DEEPSEEK_API_KEY` | Crawl4AI | (secret) | - |
| `GEMINI_API_TOKEN` | Crawl4AI | (secret) | - |
| `TOGETHER_API_KEY` | Crawl4AI | (secret) | - |
| `ANTHROPIC_API_KEY` | Crawl4AI | (secret) | - |
| `CRAWL4AI_API_TOKEN` | Crawl4AI | (secret) | - |
| `NO_TS_TUNE` | Postgis | true | Do not run timescaledb-tune at Startup. This improves memory usage of the database. |
| `POSTGRES_DB` | Postgis | n8n | Default database created when image is started. |
| `DATABASE_URL` | Postgis | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgis | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgis | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgis | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/n8n-binary-data`
- **Start command:** `n8n worker`
- **Volume:** `/qdrant/storage`
- **Start command:** `n8n webhook`
- **Healthcheck:** `/health`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/ai-agentic-automation-stack-n8n)
