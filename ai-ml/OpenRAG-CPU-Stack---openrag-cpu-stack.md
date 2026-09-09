# Deploy OpenRAG CPU Stack on Railway

RAG workspace with OpenSearch, Langflow and CPU document processing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openrag-cpu-stack)

## About

RAG workspace with OpenSearch, Langflow and CPU document processing.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 6 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opensearch | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| backend | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| openrag | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Web service |
| langflow | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Web service |
| docling | `ghcr.io/docling-project/docling-serve-cpu:latest@sha256:576fc2074ac77bcfbf3fe27633aa0dd89b452a170b2cd31689c8751e94d60f7a` | Database |
| frontend | `langflowai/openrag-frontend:0.7.1@sha256:b85c0f3b8c9c3cd4417ae422d36e61814c04e011942cf50596887844a220d740` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `discovery.type` | opensearch | single-node | Discovery.type for opensearch. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENSEARCH_JAVA_OPTS` | opensearch | -Xms1g -Xmx1g | Opensearch java opts for opensearch. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `node.store.allow_mmap` | opensearch | false | Node.store.allow mmap for opensearch. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENRAG_BACKEND_INTERNAL_URL` | opensearch | - | Openrag backend internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENSEARCH_INITIAL_ADMIN_PASSWORD` | opensearch | (secret) | Opensearch initial admin password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ENVIRONMENT` | backend | production | Environment for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MAX_WORKERS` | backend | 1 | Max workers for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_URL` | backend | - | Langflow url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENAI_API_KEY` | backend | (secret) | Required operator-supplied openai api key. Enter your own value before deployment. |
| `SESSION_SECRET` | backend | (secret) | Generated session secret. Keep private and preserve with backups. |
| `INSTANA_ENABLED` | backend | false | Instana enabled for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENSEARCH_HOST` | backend | - | Opensearch host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENSEARCH_PORT` | backend | 9200 | Opensearch port for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DOCLING_SERVE_URL` | backend | - | Docling serve url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `INGEST_SAMPLE_DATA` | backend | false | Ingest sample data for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_SUPERUSER` | backend | admin | Langflow superuser for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_AUTO_LOGIN` | backend | (secret) | Langflow auto login for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_PUBLIC_URL` | backend | - | Langflow public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENSEARCH_PASSWORD` | backend | (secret) | Opensearch password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENSEARCH_USERNAME` | backend | (secret) | Opensearch username for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `CORS_ALLOWED_ORIGINS` | backend | - | Cors allowed origins resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENSEARCH_INDEX_NAME` | backend | documents | Opensearch index name for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENRAG_ENCRYPTION_KEY` | backend | - | Generated master secret for upstream AES-256-GCM key derivation. Preserve with backups and never rotate without a reviewed re-encryption procedure. |
| `DOCLING_SERVE_VERIFY_SSL` | backend | true | Docling serve verify ssl for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENRAG_AZURE_BLOB_ENABLED` | backend | false | Openrag azure blob enabled for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_SUPERUSER_PASSWORD` | backend | (secret) | Generated langflow superuser password. Keep private and preserve with backups. |
| `OPENRAG_BACKEND_INTERNAL_URL` | backend | - | Openrag backend internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENRAG_ENFORCE_PREREQUISITES` | backend | true | Openrag enforce prerequisites for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENRAG_OPENSEARCH_NUMBER_OF_SHARDS` | backend | 1 | Openrag opensearch number of shards for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENSEARCH_NODE_COUNT_CHECK_ENABLED` | backend | false | Opensearch node count check enabled for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENRAG_OPENSEARCH_NUMBER_OF_REPLICAS` | backend | 0 | Openrag opensearch number of replicas for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | openrag | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `ACCESS_USER` | openrag | (secret) | Access user for openrag. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | openrag | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | openrag | 3000 | Upstream port for openrag. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | openrag | (secret) | Generated access password. Keep private and preserve with backups. |
| `OPENAI_API_KEY` | langflow | (secret) | Openai api key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENSEARCH_URL` | langflow | - | Opensearch url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENSEARCH_HOST` | langflow | - | Opensearch host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENSEARCH_PORT` | langflow | 9200 | Opensearch port for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_WORKERS` | langflow | 1 | Langflow workers for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DOCLING_SERVE_URL` | langflow | - | Docling serve url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LANGFLOW_LOG_LEVEL` | langflow | info | Langflow log level for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_SUPERUSER` | langflow | admin | Langflow superuser for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_AUTO_LOGIN` | langflow | (secret) | Langflow auto login for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_CONFIG_DIR` | langflow | /app/langflow-data | Langflow config dir for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_SECRET_KEY` | langflow | (secret) | Generated langflow secret key. Keep private and preserve with backups. |
| `OPENSEARCH_PASSWORD` | langflow | (secret) | Opensearch password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OPENSEARCH_USERNAME` | langflow | (secret) | Opensearch username for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENRAG_LLM_BASE_URL` | langflow | - | Openrag llm base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LANGFLOW_DATABASE_URL` | langflow | sqlite:////app/langflow-data/langflow.db?timeout=60 | Langflow database url for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENSEARCH_INDEX_NAME` | langflow | documents | Opensearch index name for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DOCLING_SERVE_VERIFY_SSL` | langflow | true | Docling serve verify ssl for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_NEW_USER_IS_ACTIVE` | langflow | false | Langflow new user is active for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_SSRF_ALLOWED_HOSTS` | langflow | - | Langflow ssrf allowed hosts resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LANGFLOW_SUPERUSER_PASSWORD` | langflow | (secret) | Langflow superuser password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LANGFLOW_ENABLE_SUPERUSER_CLI` | langflow | true | Langflow enable superuser cli for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_COMPONENTS_INDEX_PATH` | langflow | /app/flows/component_index.json | Langflow components index path for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LANGFLOW_ALLOW_CUSTOM_COMPONENTS` | langflow | false | Langflow allow custom components for langflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `HF_HOME` | docling | /data/huggingface | Hf home for docling. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DOCLING_SERVE_ENABLE_UI` | docling | false | Docling serve enable ui for docling. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DOCLING_SERVE_MAX_NUM_CONCURRENT_JOBS` | docling | 1 | Docling serve max num concurrent jobs for docling. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | frontend | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `HOSTNAME` | frontend | 0.0.0.0 | Application bind address. Keep 0.0.0.0 for container networking. |
| `OPENRAG_BACKEND_HOST` | frontend | - | Openrag backend host resolved automatically from the linked service. Keep this reference when using the included topology. |

## Configuration

- **Volume:** `/usr/share/opensearch/data`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow-data`

**Category:** AI/ML · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openrag-cpu-stack)
