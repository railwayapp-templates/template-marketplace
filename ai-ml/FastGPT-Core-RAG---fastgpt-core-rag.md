# Deploy FastGPT Core + RAG on Railway

FastGPT chat and RAG with MongoDB, pgvector, Redis and object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastgpt-core-rag)

## About

FastGPT chat and RAG with MongoDB, pgvector, Redis and object storage.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 9 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aiproxy | `ghcr.io/labring/aiproxy:v0.6.5@sha256:9b2d9148c8d8a09d2e70577b492b7b32aab5877fe48c2c78a6d300005f4d42bb` | Worker |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| storage | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| plugin | `ghcr.io/labring/fastgpt-plugin:v1.1.2@sha256:80049419369c7c8ad207acc09d7df0a62fdeafcb489651d3b2bdad769f6dc6a2` | Worker |
| vector | `pgvector/pgvector:0.8.0-pg15@sha256:1dec32aaba982ea73c51e93bee0319abf54150110321e24101c3d9de0b88db98` | Database |
| fastgpt | `ghcr.io/labring/fastgpt:v4.16.2@sha256:23f0f23e69d8c22f547bc8887d7089a87bbef10e67fa239489bcc241cff6ee1e` | Web service |
| mongo | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| code-sandbox | `ghcr.io/labring/fastgpt-code-sandbox:v4.16.0@sha256:4ba4613d7fa6534e72a3adbfe3cd26f6617ba55df99e21d71a8fe7c6ebff36ab` | Worker |
| aiproxy-db | `postgres:15@sha256:9b1d34adbce1dd07ee6e94b4a2cf698884b89bd44a6c9c12f5da8f3acbfe4957` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | aiproxy | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `SQL_DSN` | aiproxy | - | Sql dsn resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ADMIN_KEY` | aiproxy | - | Admin key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `BILLING_ENABLED` | aiproxy | false | Billing enabled for aiproxy. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DISABLE_MODEL_CONFIG` | aiproxy | true | Disable model config for aiproxy. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LOG_DETAIL_STORAGE_HOURS` | aiproxy | 1 | Log detail storage hours for aiproxy. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `S3_BUCKETS` | storage | fastgpt-public fastgpt-private | S3 buckets for storage. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_ROOT_USER` | storage | (secret) | Generated minio root user. Keep private and preserve with backups. |
| `MINIO_ROOT_PASSWORD` | storage | (secret) | Generated minio root password. Keep private and preserve with backups. |
| `PORT` | plugin | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `REDIS_URL` | plugin | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `AUTH_TOKEN` | plugin | (secret) | Auth token resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_MAX_LINK` | plugin | - | Db max link resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MONGODB_URI` | plugin | - | Mongodb uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_REGION` | plugin | - | Storage region resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_VENDOR` | plugin | - | Storage vendor resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_S3_ENDPOINT` | plugin | - | Storage s3 endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_ACCESS_KEY_ID` | plugin | - | Storage access key id resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_PUBLIC_BUCKET` | plugin | - | Storage public bucket resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_PRIVATE_BUCKET` | plugin | - | Storage private bucket resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_DOWNLOAD_URL_MODE` | plugin | - | Storage download url mode resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_SECRET_ACCESS_KEY` | plugin | (secret) | Storage secret access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_S3_FORCE_PATH_STYLE` | plugin | - | Storage s3 force path style resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_DB` | vector | fastgpt | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | vector | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | vector | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | vector | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `PORT` | fastgpt | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `PG_URL` | fastgpt | - | Pg url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `HOSTNAME` | fastgpt | 0.0.0.0 | Application bind address. Keep 0.0.0.0 for container networking. |
| `ROOT_KEY` | fastgpt | - | Generated root key. Keep private and preserve with backups. |
| `FE_DOMAIN` | fastgpt | - | Fe domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URL` | fastgpt | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `SYNC_INDEX` | fastgpt | true | Sync index for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_MAX_LINK` | fastgpt | 20 | Db max link for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGODB_URI` | fastgpt | - | Mongodb uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PLUGIN_TOKEN` | fastgpt | (secret) | Generated plugin token. Keep private and preserve with backups. |
| `FILE_TOKEN_KEY` | fastgpt | (secret) | Generated file token key. Keep private and preserve with backups. |
| `QA_MAX_PROCESS` | fastgpt | 2 | Qa max process for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `STORAGE_REGION` | fastgpt | us-east-1 | Storage region for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `STORAGE_VENDOR` | fastgpt | minio | Storage vendor for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LOG_ENABLE_OTEL` | fastgpt | false | Log enable otel for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PLUGIN_BASE_URL` | fastgpt | - | Plugin base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `VLM_MAX_PROCESS` | fastgpt | 2 | Vlm max process for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `CODE_SANDBOX_URL` | fastgpt | - | Code sandbox url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DEFAULT_ROOT_PSW` | fastgpt | - | Generated initial root password; upstream may reapply this value on restart. Keep in sync with your intended root login. |
| `AES256_SECRET_KEY` | fastgpt | (secret) | Generated aes256 secret key. Keep private and preserve with backups. |
| `AIPROXY_API_TOKEN` | fastgpt | (secret) | Generated aiproxy api token. Keep private and preserve with backups. |
| `LOG_CONSOLE_LEVEL` | fastgpt | info | Log console level for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `CODE_SANDBOX_TOKEN` | fastgpt | (secret) | Generated code sandbox token. Keep private and preserve with backups. |
| `LOG_ENABLE_CONSOLE` | fastgpt | true | Log enable console for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `VECTOR_MAX_PROCESS` | fastgpt | 2 | Vector max process for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `INVOKE_TOKEN_SECRET` | fastgpt | (secret) | Generated invoke token secret. Keep private and preserve with backups. |
| `STORAGE_S3_ENDPOINT` | fastgpt | - | Storage s3 endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AIPROXY_API_ENDPOINT` | fastgpt | - | Aiproxy api endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_ACCESS_KEY_ID` | fastgpt | - | Storage access key id resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_PUBLIC_BUCKET` | fastgpt | fastgpt-public | Storage public bucket for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `STORAGE_PRIVATE_BUCKET` | fastgpt | fastgpt-private | Storage private bucket for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATASET_PARSE_MAX_PROCESS` | fastgpt | 2 | Dataset parse max process for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `STORAGE_DOWNLOAD_URL_MODE` | fastgpt | short-proxy | Storage download url mode for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `STORAGE_SECRET_ACCESS_KEY` | fastgpt | (secret) | Storage secret access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_S3_FORCE_PATH_STYLE` | fastgpt | true | Storage s3 force path style for fastgpt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGO_PRIVATE_HOST` | mongo | - | Mongo private host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Generated mongo initdb root password. Keep private and preserve with backups. |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | Mongo initdb root username for mongo. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | code-sandbox | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `SANDBOX_TOKEN` | code-sandbox | (secret) | Sandbox token resolved automatically from the linked service. Keep this reference when using the included topology. |
| `CHECK_INTERNAL_IP` | code-sandbox | true | Check internal ip for code-sandbox. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SANDBOX_POOL_SIZE` | code-sandbox | 2 | Sandbox pool size for code-sandbox. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SANDBOX_MAX_TIMEOUT` | code-sandbox | 60000 | Sandbox max timeout for code-sandbox. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SANDBOX_MAX_MEMORY_MB` | code-sandbox | 256 | Sandbox max memory mb for code-sandbox. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SANDBOX_MAX_OUTPUT_MB` | code-sandbox | 10 | Sandbox max output mb for code-sandbox. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SANDBOX_API_MAX_BODY_MB` | code-sandbox | 8 | Sandbox api max body mb for code-sandbox. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SANDBOX_REQUEST_MAX_COUNT` | code-sandbox | 30 | Sandbox request max count for code-sandbox. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRES_DB` | aiproxy-db | aiproxy | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | aiproxy-db | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | aiproxy-db | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | aiproxy-db | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |

## Configuration

- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/fastgpt-core-rag)
